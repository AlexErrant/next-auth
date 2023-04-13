/**
 * Wikimedia OAuth2 provider.
 * All Wikimedia wikis are supported. Wikipedia, Wikidata, etc...
 *
 * (Register)[https://meta.wikimedia.org/wiki/Special:OAuthConsumerRegistration]
 * (Documentation)[https://www.mediawiki.org/wiki/Extension:OAuth]
 */
export default function Wikimedia(options) {
    return {
        id: "wikimedia",
        name: "Wikimedia",
        type: "oauth",
        token: "https://meta.wikimedia.org/w/rest.php/oauth2/access_token",
        userinfo: "https://meta.wikimedia.org/w/rest.php/oauth2/resource/profile",
        // TODO: is empty scope necessary?
        authorization: "https://meta.wikimedia.org/w/rest.php/oauth2/authorize?scope=",
        profile(profile) {
            return {
                id: profile.sub,
                name: profile.username,
                email: profile.email,
                image: null,
            };
        },
        style: {
            logo: "/wikimedia.svg",
            logoDark: "/wikimedia-dark.svg",
            bg: "#fff",
            text: "#000",
            bgDark: "#000",
            textDark: "#fff",
        },
        options,
    };
}
