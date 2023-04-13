import type { OIDCConfig, OIDCUserConfig } from "./index.js";
export interface TwitchProfile extends Record<string, any> {
    sub: string;
    preferred_username: string;
    email: string;
    picture: string;
}
export default function Twitch(config: OIDCUserConfig<TwitchProfile>): OIDCConfig<TwitchProfile>;
//# sourceMappingURL=twitch.d.ts.map