export default function Trakt(options) {
    return {
        id: "trakt",
        name: "Trakt",
        type: "oauth",
        // when default, trakt returns auth error. TODO: Does it?
        authorization: "https://trakt.tv/oauth/authorize?scope=",
        token: "https://api.trakt.tv/oauth/token",
        userinfo: {
            url: "https://api.trakt.tv/users/me?extended=full",
            async request({ tokens, provider }) {
                return await fetch(provider.userinfo?.url, {
                    headers: {
                        Authorization: `Bearer ${tokens.access_token}`,
                        "trakt-api-version": "2",
                        "trakt-api-key": provider.clientId,
                    },
                }).then(async (res) => await res.json());
            },
        },
        profile(profile) {
            return {
                id: profile.ids.slug,
                name: profile.name,
                email: null,
                image: profile.images.avatar.full, // trakt does not allow hotlinking
            };
        },
        style: {
            logo: "/trakt.svg",
            logoDark: "/trakt-dark.svg",
            bg: "#fff",
            text: "#ED2224",
            bgDark: "#ED2224",
            textDark: "#fff",
        },
        options,
    };
}
