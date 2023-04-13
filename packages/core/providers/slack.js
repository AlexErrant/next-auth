export default function Slack(options) {
    return {
        id: "slack",
        name: "Slack",
        type: "oidc",
        issuer: "https://slack.com",
        style: {
            logo: "/slack.svg",
            logoDark: "/slack.svg",
            bg: "#fff",
            text: "#000",
            bgDark: "#000",
            textDark: "#fff",
        },
        options,
    };
}
