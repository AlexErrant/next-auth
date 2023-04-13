import type { OAuthConfig, OAuthUserConfig } from "./index.js";
export interface SalesforceProfile extends Record<string, any> {
    sub: string;
    nickname: string;
    email: string;
    picture: string;
}
export default function Salesforce<P extends SalesforceProfile>(options: OAuthUserConfig<P>): OAuthConfig<P>;
//# sourceMappingURL=salesforce.d.ts.map