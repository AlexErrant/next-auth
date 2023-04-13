/** @type {import(".").OAuthProvider} */
export default function FACEIT(options: any): {
    id: string;
    name: string;
    type: string;
    authorization: string;
    headers: {
        Authorization: string;
    };
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
//# sourceMappingURL=faceit.d.ts.map