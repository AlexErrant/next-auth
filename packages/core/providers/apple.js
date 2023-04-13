/**
 * <div style={{backgroundColor: "#000", display: "flex", justifyContent: "space-between", color: "#fff", padding: 16}}>
 * <span>Built-in <b>Apple</b> integration.</span>
 * <a href="https://apple.com">
 *   <img style={{display: "block"}} src="https://authjs.dev/img/providers/apple-dark.svg" height="48" width="48"/>
 * </a>
 * </div>
 *
 * ---
 * @module providers/apple
 */
export default function Apple(options) {
    return {
        id: "apple",
        name: "Apple",
        type: "oidc",
        issuer: "https://appleid.apple.com",
        authorization: {
            params: { scope: "name email", response_mode: "form_post" },
        },
        profile(profile) {
            return {
                id: profile.sub,
                name: profile.name,
                email: profile.email,
                image: null,
            };
        },
        style: {
            logo: "/apple.svg",
            logoDark: "/apple-dark.svg",
            bg: "#fff",
            text: "#000",
            bgDark: "#000",
            textDark: "#fff",
        },
        options,
    };
}
