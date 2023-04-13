export default function PinterestProvider(options) {
    return {
        id: "pinterest",
        name: "Pinterest",
        type: "oauth",
        authorization: {
            url: "https://www.pinterest.com/oauth",
            params: { scope: "user_accounts:read" },
        },
        token: "https://api.pinterest.com/v5/oauth/token",
        userinfo: "https://api.pinterest.com/v5/user_account",
        profile({ username, profile_image }) {
            return {
                id: username,
                name: username,
                image: profile_image,
                email: null,
            };
        },
        options,
    };
}
