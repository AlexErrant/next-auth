export default function Google(options) {
    return {
        id: "google",
        name: "Google",
        type: "oidc",
        issuer: "https://accounts.google.com",
        style: {
            logo: "/google.svg",
            logoDark: "/google.svg",
            bgDark: "#fff",
            bg: "#fff",
            text: "#000",
            textDark: "#000",
        },
        options,
    };
}
