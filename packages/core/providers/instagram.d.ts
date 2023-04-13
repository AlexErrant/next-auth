/**
 * @type {import("src/providers").OAuthProvider} options
 * @example
 *
 * ```js
 * // pages/api/auth/[...nextauth].js
 * import Providers from `next-auth/providers`
 * ...
 * providers: [
 *   Providers.Instagram({
 *     clientId: process.env.INSTAGRAM_CLIENT_ID,
 *     clientSecret: process.env.INSTAGRAM_CLIENT_SECRET
 *   })
 * ]
 * ...
 *
 * // pages/index
 * import { signIn } from "next-auth/react"
 * ...
 * <button onClick={() => signIn("instagram")}>
 *   Sign in
 * </button>
 * ...
 * ```
 * [NextAuth.js Documentation](https://authjs.dev/reference/providers/instagram) | [Instagram Documentation](https://developers.facebook.com/docs/instagram-basic-display-api/getting-started) | [Configuration](https://developers.facebook.com/apps)
 */
/** @type {import(".").OAuthProvider} */
export default function Instagram(options: any): {
    id: string;
    name: string;
    type: string;
    authorization: string;
    token: string;
    userinfo: string;
    client: {
        token_endpoint_auth_method: string;
    };
    profile(profile: any): Promise<{
        id: any;
        name: any;
        email: null;
        image: null;
    }>;
    style: {
        logo: string;
        logoDark: string;
        bg: string;
        text: string;
        bgDark: string;
        textDark: string;
    };
    options: any;
};
//# sourceMappingURL=instagram.d.ts.map