/** @type {import(".").OAuthProvider} */
export default function Mailchimp(options: any): {
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
        image: null;
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
//# sourceMappingURL=mailchimp.d.ts.map