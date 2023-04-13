/** @type {import(".").OAuthProvider} */
export default function Box(options: any): {
    id: string;
    name: string;
    type: string;
    authorization: string;
    token: string;
    userinfo: string;
    profile(profile: any): {
        id: any;
        name: any;
        email: any;
        image: any;
    };
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
//# sourceMappingURL=box.d.ts.map