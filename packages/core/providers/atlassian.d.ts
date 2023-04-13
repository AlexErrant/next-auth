import type { OAuthConfig, OAuthUserConfig } from "./index.js";
interface AtlassianProfile extends Record<string, any> {
    account_id: string;
    name: string;
    email: string;
    picture: string;
}
export default function Atlassian<P extends AtlassianProfile>(options: OAuthUserConfig<P>): OAuthConfig<P>;
export {};
//# sourceMappingURL=atlassian.d.ts.map