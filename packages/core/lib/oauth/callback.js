import * as checks from "./checks.js";
import * as o from "oauth4webapi";
import { OAuthCallbackError, OAuthProfileParseError } from "../../errors.js";
/**
 * Handles the following OAuth steps.
 * https://www.rfc-editor.org/rfc/rfc6749#section-4.1.1
 * https://www.rfc-editor.org/rfc/rfc6749#section-4.1.3
 * https://openid.net/specs/openid-connect-core-1_0.html#UserInfoRequest
 *
 * @note Although requesting userinfo is not required by the OAuth2.0 spec,
 * we fetch it anyway. This is because we always want a user profile.
 */
export async function handleOAuth(query, cookies, options) {
    const { logger, provider } = options;
    let as;
    const { token, userinfo } = provider;
    // Falls back to authjs.dev if the user only passed params
    if ((!token?.url || token.url.host === "authjs.dev") &&
        (!userinfo?.url || userinfo.url.host === "authjs.dev")) {
        // We assume that issuer is always defined as this has been asserted earlier
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const issuer = new URL(provider.issuer);
        const discoveryResponse = await o.discoveryRequest(issuer);
        const discoveredAs = await o.processDiscoveryResponse(issuer, discoveryResponse);
        if (!discoveredAs.token_endpoint)
            throw new TypeError("TODO: Authorization server did not provide a token endpoint.");
        if (!discoveredAs.userinfo_endpoint)
            throw new TypeError("TODO: Authorization server did not provide a userinfo endpoint.");
        as = discoveredAs;
    }
    else {
        as = {
            issuer: provider.issuer ?? "https://authjs.dev",
            token_endpoint: token?.url.toString(),
            userinfo_endpoint: userinfo?.url.toString(),
        };
    }
    const client = {
        client_id: provider.clientId,
        client_secret: provider.clientSecret,
        ...provider.client,
    };
    const resCookies = [];
    const state = await checks.state.use(cookies, resCookies, options);
    const codeGrantParams = o.validateAuthResponse(as, client, new URLSearchParams(query), provider.checks.includes("state") ? state : o.skipStateCheck);
    /** https://www.rfc-editor.org/rfc/rfc6749#section-4.1.2.1 */
    if (o.isOAuth2Error(codeGrantParams)) {
        logger.debug("OAuthCallbackError", {
            providerId: provider.id,
            ...codeGrantParams,
        });
        throw new OAuthCallbackError(codeGrantParams.error);
    }
    const codeVerifier = await checks.pkce.use(cookies, resCookies, options);
    let codeGrantResponse = await o.authorizationCodeGrantRequest(as, client, codeGrantParams, provider.callbackUrl, codeVerifier ?? "auth" // TODO: review fallback code verifier
    );
    if (provider.token?.conform) {
        codeGrantResponse =
            (await provider.token.conform(codeGrantResponse.clone())) ??
                codeGrantResponse;
    }
    let challenges;
    if ((challenges = o.parseWwwAuthenticateChallenges(codeGrantResponse))) {
        for (const challenge of challenges) {
            console.log("challenge", challenge);
        }
        throw new Error("TODO: Handle www-authenticate challenges as needed");
    }
    let profile = {};
    let tokens;
    if (provider.type === "oidc") {
        const nonce = await checks.nonce.use(cookies, resCookies, options);
        const result = await o.processAuthorizationCodeOpenIDResponse(as, client, codeGrantResponse, nonce ?? o.expectNoNonce);
        if (o.isOAuth2Error(result)) {
            console.log("error", result);
            throw new Error("TODO: Handle OIDC response body error");
        }
        profile = o.getValidatedIdTokenClaims(result);
        tokens = result;
    }
    else {
        tokens = await o.processAuthorizationCodeOAuth2Response(as, client, codeGrantResponse);
        if (o.isOAuth2Error(tokens)) {
            console.log("error", tokens);
            throw new Error("TODO: Handle OAuth 2.0 response body error");
        }
        if (userinfo?.request) {
            profile = await userinfo.request({ tokens, provider });
        }
        else if (userinfo?.url) {
            const userinfoResponse = await o.userInfoRequest(as, client, tokens.access_token);
            profile = await userinfoResponse.json();
        }
    }
    const profileResult = await getProfile(profile, provider, tokens, logger);
    return { ...profileResult, cookies: resCookies };
}
/** Returns profile, raw profile and auth provider details */
async function getProfile(OAuthProfile, provider, tokens, logger) {
    try {
        const profile = await provider.profile(OAuthProfile, tokens);
        profile.email = profile.email?.toLowerCase();
        if (!profile.id) {
            throw new TypeError(`Profile id is missing in ${provider.name} OAuth profile response`);
        }
        return {
            profile,
            account: {
                provider: provider.id,
                type: provider.type,
                providerAccountId: profile.id.toString(),
                ...tokens,
            },
            OAuthProfile,
        };
    }
    catch (e) {
        // If we didn't get a response either there was a problem with the provider
        // response *or* the user cancelled the action with the provider.
        //
        // Unfortunately, we can't tell which - at least not in a way that works for
        // all providers, so we return an empty object; the user should then be
        // redirected back to the sign up page. We log the error to help developers
        // who might be trying to debug this when configuring a new provider.
        logger.debug("getProfile error details", OAuthProfile);
        logger.error(new OAuthProfileParseError(e));
    }
}
