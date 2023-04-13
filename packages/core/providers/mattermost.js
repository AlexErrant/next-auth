/**
 * To create your Mattermost OAuth2 app visit http://`<your Mattermost instance url>`/`<your team>`/integrations/oauth2-apps
 *
 * ## Example
 *
 * ```ts
 * import Mattermost from "@auth/core/providers/mattermost";
 * ...
 * providers: [
 *   Mattermost({
 *     clientId: env.MATTERMOST_ID,
 *     clientSecret: env.MATTERMOST_SECRET,
 *     // The base url of your Mattermost instance. e.g https://my-cool-server.cloud.mattermost.com
 *     issuer: env.MATTERMOST_ISSUER,
 *   })
 * ]
 * ...
 * ```
 *
 * :::warning
 * The Mattermost provider requires the `issuer` option to be set. This is the base url of your Mattermost instance. e.g https://my-cool-server.cloud.mattermost.com
 * :::
 */
export default function Mattermost(config) {
    const { issuer, ...rest } = config;
    return {
        id: "mattermost",
        name: "Mattermost",
        type: "oauth",
        client: { token_endpoint_auth_method: "client_secret_post" },
        token: `${issuer}/oauth/access_token`,
        authorization: `${issuer}/oauth/authorize`,
        userinfo: `${issuer}/api/v4/users/me`,
        profile(profile) {
            return {
                id: profile.id,
                name: profile.username ?? `${profile.first_name} ${profile.last_name}`,
                email: profile.email,
                image: null,
            };
        },
        style: {
            logo: "/mattermost.svg",
            logoDark: "/mattermost-dark.svg",
            bg: "#fff",
            text: "#000",
            bgDark: "#000",
            textDark: "#fff",
        },
        options: rest,
    };
}
