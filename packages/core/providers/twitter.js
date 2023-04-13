export default function Twitter(config) {
    return {
        id: "twitter",
        name: "Twitter",
        type: "oauth",
        checks: ["pkce", "state"],
        authorization: "https://twitter.com/i/oauth2/authorize?scope=users.read tweet.read offline.access",
        token: "https://api.twitter.com/2/oauth2/token",
        userinfo: "https://api.twitter.com/2/users/me?user.fields=profile_image_url",
        profile({ data }) {
            return {
                id: data.id,
                name: data.name,
                email: data.email ?? null,
                image: data.profile_image_url,
            };
        },
        style: {
            logo: "/twitter.svg",
            logoDark: "/twitter-dark.svg",
            bg: "#fff",
            text: "#1da1f2",
            bgDark: "#1da1f2",
            textDark: "#fff",
        },
        options: config,
    };
}
