export default function Cognito(options) {
    return {
        id: "cognito",
        name: "Cognito",
        type: "oidc",
        style: {
            logo: "/cognito.svg",
            logoDark: "/cognito.svg",
            bg: "#fff",
            text: "#C17B9E",
            bgDark: "#fff",
            textDark: "#C17B9E",
        },
        options,
    };
}
