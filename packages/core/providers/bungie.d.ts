/** @type {import(".").OAuthProvider} */
export default function Bungie(options: any): {
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
        image: string;
    };
    options: any;
};
//# sourceMappingURL=bungie.d.ts.map