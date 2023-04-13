import type { OAuthConfig, OAuthUserConfig } from "./index.js";
export interface PinterestProfile extends Record<string, any> {
    account_type: "BUSINESS" | "PINNER";
    profile_image: string;
    website_url: string;
    username: string;
}
export default function PinterestProvider<P extends PinterestProfile>(options: OAuthUserConfig<P>): OAuthConfig<P>;
//# sourceMappingURL=pinterest.d.ts.map