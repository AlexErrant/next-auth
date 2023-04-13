export default function BattleNet(options) {
    return {
        id: "battlenet",
        name: "Battle.net",
        type: "oidc",
        profile(profile) {
            return {
                id: profile.sub,
                name: profile.battle_tag,
                email: null,
                image: null,
            };
        },
        style: {
            logo: "/battlenet.svg",
            logoDark: "/battlenet-dark.svg",
            bg: "#fff",
            text: "#148eff",
            bgDark: "#148eff",
            textDark: "#fff",
        },
        options,
    };
}
