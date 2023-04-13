/**
 * <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16}}>
 *  <p style={{fontWeight: "normal"}}>Official <a href="https://docs.upstash.com/redis">Upstash Redis</a> adapter for Auth.js / NextAuth.js.</p>
 *  <a href="https://docs.upstash.com/redis">
 *   <img style={{display: "block"}} src="https://authjs.dev/img/adapters/upstash-redis.svg" width="60"/>
 *  </a>
 * </div>
 *
 * ## Installation
 *
 * ```bash npm2yarn2pnpm
 * npm install @upstash/redis @next-auth/upstash-redis-adapter
 * ```
 *
 * @module @next-auth/upstash-redis-adapter
 */
import type { Adapter } from "next-auth/adapters";
import type { Redis } from "@upstash/redis";
/** This is the interface of the Upstash Redis adapter options. */
export interface UpstashRedisAdapterOptions {
    /**
     * The base prefix for your keys
     */
    baseKeyPrefix?: string;
    /**
     * The prefix for the `account` key
     */
    accountKeyPrefix?: string;
    /**
     * The prefix for the `accountByUserId` key
     */
    accountByUserIdPrefix?: string;
    /**
     * The prefix for the `emailKey` key
     */
    emailKeyPrefix?: string;
    /**
     * The prefix for the `sessionKey` key
     */
    sessionKeyPrefix?: string;
    /**
     * The prefix for the `sessionByUserId` key
     */
    sessionByUserIdKeyPrefix?: string;
    /**
     * The prefix for the `user` key
     */
    userKeyPrefix?: string;
    /**
     * The prefix for the `verificationToken` key
     */
    verificationTokenKeyPrefix?: string;
}
export declare const defaultOptions: {
    baseKeyPrefix: string;
    accountKeyPrefix: string;
    accountByUserIdPrefix: string;
    emailKeyPrefix: string;
    sessionKeyPrefix: string;
    sessionByUserIdKeyPrefix: string;
    userKeyPrefix: string;
    verificationTokenKeyPrefix: string;
};
export declare function hydrateDates(json: object): any;
/**
 * ## Setup
 *
 * Configure Auth.js to use the Upstash Redis Adapter:
 *
 * ```javascript title="pages/api/auth/[...nextauth].js"
 * import NextAuth from "next-auth"
 * import GoogleProvider from "next-auth/providers/google"
 * import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter"
 * import upstashRedisClient from "@upstash/redis"
 *
 * const redis = upstashRedisClient(
 *   process.env.UPSTASH_REDIS_URL,
 *   process.env.UPSTASH_REDIS_TOKEN
 * )
 *
 * export default NextAuth({
 *   adapter: UpstashRedisAdapter(redis),
 *   providers: [
 *     GoogleProvider({
 *       clientId: process.env.GOOGLE_CLIENT_ID,
 *       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
 *     }),
 *   ],
 * })
 * ```
 *
 * ## Advanced usage
 *
 * ### Using multiple apps with a single Upstash Redis instance
 *
 * The Upstash free-tier allows for only one Redis instance. If you have multiple Auth.js connected apps using this instance, you need different key prefixes for every app.
 *
 * You can change the prefixes by passing an `options` object as the second argument to the adapter factory function.
 *
 * The default values for this object are:
 *
 * ```js
 * const defaultOptions = {
 *   baseKeyPrefix: "",
 *   accountKeyPrefix: "user:account:",
 *   accountByUserIdPrefix: "user:account:by-user-id:",
 *   emailKeyPrefix: "user:email:",
 *   sessionKeyPrefix: "user:session:",
 *   sessionByUserIdKeyPrefix: "user:session:by-user-id:",
 *   userKeyPrefix: "user:",
 *   verificationTokenKeyPrefix: "user:token:",
 * }
 * ```
 *
 * Usually changing the `baseKeyPrefix` should be enough for this scenario, but for more custom setups, you can also change the prefixes of every single key.
 *
 * Example:
 *
 * ```js
 * export default NextAuth({
 *   ...
 *   adapter: UpstashRedisAdapter(redis, {baseKeyPrefix: "app2:"})
 *   ...
 * })
 * ```
 */
export declare function UpstashRedisAdapter(client: Redis, options?: UpstashRedisAdapterOptions): Adapter;
