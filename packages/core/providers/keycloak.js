export default function Keycloak(options) {
    return {
        id: "keycloak",
        name: "Keycloak",
        type: "oidc",
        style: {
            logo: "/keycloak.svg",
            logoDark: "/keycloak.svg",
            bg: "#fff",
            text: "#000",
            bgDark: "#fff",
            textDark: "#000",
        },
        options,
    };
}
