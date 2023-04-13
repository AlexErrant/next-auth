export default function Okta(options) {
    return {
        id: "okta",
        name: "Okta",
        type: "oidc",
        style: {
            logo: "/okta.svg",
            logoDark: "/okta-dark.svg",
            bg: "#fff",
            text: "#000",
            bgDark: "#000",
            textDark: "#fff",
        },
        options,
    };
}
