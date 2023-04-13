/** @type {import(".").OAuthProvider} */
export default function Netlify(options: any): {
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
    options: any;
};
//# sourceMappingURL=netlify.d.ts.map