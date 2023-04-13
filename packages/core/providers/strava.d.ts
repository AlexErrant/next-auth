import type { OAuthConfig, OAuthUserConfig } from "./index.js";
export interface StravaProfile extends Record<string, any> {
    id: string;
    firstname: string;
    lastname: string;
    profile: string;
}
export default function Strava<P extends StravaProfile>(options: OAuthUserConfig<P>): OAuthConfig<P>;
//# sourceMappingURL=strava.d.ts.map