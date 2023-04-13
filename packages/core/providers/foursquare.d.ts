/** @type {import(".").OAuthProvider} */
export default function Foursquare(options: any): {
    id: string;
    name: string;
    type: string;
    authorization: string;
    token: string;
    userinfo: {
        url: string;
        request({ tokens, provider }: {
            tokens: any;
            provider: any;
        }): Promise<any>;
    };
    profile({ response: { user: profile } }: {
        response: {
            user: any;
        };
    }): {
        id: any;
        name: string;
        email: any;
        image: string | null;
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
//# sourceMappingURL=foursquare.d.ts.map