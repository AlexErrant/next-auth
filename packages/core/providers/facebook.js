export default function Facebook(options) {
    return {
        id: "facebook",
        name: "Facebook",
        type: "oauth",
        authorization: "https://www.facebook.com/v15.0/dialog/oauth?scope=email",
        token: "https://graph.facebook.com/oauth/access_token",
        userinfo: {
            // https://developers.facebook.com/docs/graph-api/reference/user/#fields
            url: "https://graph.facebook.com/me?fields=id,name,email,picture",
            async request({ tokens, provider }) {
                return await fetch(provider.userinfo?.url, {
                    headers: { Authorization: `Bearer ${tokens.access_token}` },
                }).then(async (res) => await res.json());
            },
        },
        profile(profile) {
            return {
                id: profile.id,
                name: profile.name,
                email: profile.email,
                image: profile.picture.data.url,
            };
        },
        style: {
            logo: "/facebook.svg",
            logoDark: "/facebook-dark.svg",
            bg: "#fff",
            text: "#006aff",
            bgDark: "#006aff",
            textDark: "#fff",
        },
        options,
    };
}
