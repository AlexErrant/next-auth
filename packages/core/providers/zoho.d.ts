/** @type {import(".").OAuthProvider} */
export default function Zoho(options: any): {
    id: string;
    name: string;
    type: string;
    authorization: string;
    token: string;
    userinfo: string;
    profile(profile: any): {
        id: any;
        name: string;
        email: any;
        image: null;
    };
    options: any;
};
//# sourceMappingURL=zoho.d.ts.map