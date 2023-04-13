import type { InternalOptions, ResponseInternal, Session } from "../../types.js";
import type { SessionStore } from "../cookie.js";
/** Return a session object filtered via `callbacks.session` */
export declare function session(sessionStore: SessionStore, options: InternalOptions): Promise<ResponseInternal<Session | null>>;
//# sourceMappingURL=session.d.ts.map