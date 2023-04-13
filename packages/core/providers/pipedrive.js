export default function Pipedrive(options) {
    return {
        id: "pipedrive",
        name: "Pipedrive",
        type: "oauth",
        authorization: "https://oauth.pipedrive.com/oauth/authorize",
        token: "https://oauth.pipedrive.com/oauth/token",
        userinfo: "https://api.pipedrive.com/users/me",
        profile: ({ data: profile }) => {
            return {
                id: profile.id.toString(),
                name: profile.name,
                email: profile.email,
                image: profile.icon_url,
            };
        },
        options,
    };
}
