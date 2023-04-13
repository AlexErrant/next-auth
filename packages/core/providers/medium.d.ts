/** @type {import(".").OAuthProvider} */
export default function Medium(options: any): {
    id: string;
    name: string;
    type: string;
    authorization: string;
    token: string;
    userinfo: string;
    profile(profile: any): {
        id: any;
        name: any;
        email: null;
        image: any;
    };
    options: any;
};
//# sourceMappingURL=medium.d.ts.map