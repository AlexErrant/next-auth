export default function LINE(options) {
    return {
        id: "line",
        name: "LINE",
        type: "oidc",
        issuer: "https://access.line.me",
        client: {
            id_token_signed_response_alg: "HS256",
        },
        style: {
            logo: "/line.svg",
            logoDark: "/line.svg",
            bg: "#fff",
            text: "#00C300",
            bgDark: "#00C300",
            textDark: "#fff",
        },
        options,
    };
}
