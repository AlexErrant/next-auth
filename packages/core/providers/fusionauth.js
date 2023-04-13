export default function FusionAuth(
// tenantId only needed if there is more than one tenant configured on the server
options) {
    return {
        id: "fusionauth",
        name: "FusionAuth",
        type: "oauth",
        wellKnown: options?.tenantId
            ? `${options.issuer}/.well-known/openid-configuration?tenantId=${options.tenantId}`
            : `${options.issuer}/.well-known/openid-configuration`,
        authorization: {
            params: {
                scope: "openid offline_access",
                ...(options?.tenantId && { tenantId: options.tenantId }),
            },
        },
        checks: ["pkce", "state"],
        profile(profile) {
            return {
                id: profile.sub,
                email: profile.email,
                name: profile?.preferred_username,
            };
        },
        options,
    };
}
