export default function UnitedEffects(options) {
    return {
        id: "united-effects",
        name: "United Effects",
        type: "oidc",
        authorization: {
            params: { scope: "openid email profile", resource: options.issuer },
        },
        options,
    };
}
