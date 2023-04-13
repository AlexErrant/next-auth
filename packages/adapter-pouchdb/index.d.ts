/**
 * <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16}}>
 *  <p style={{fontWeight: "normal"}}>Official <a href="https://pouchdb.com/api.html">PouchDB</a> adapter for Auth.js / NextAuth.js.</p>
 *  <a href="https://pouchdb.com">
 *   <img style={{display: "block"}} src="https://authjs.dev/img/adapters/pouchdb.svg" width="38" />
 *  </a>
 * </div>
 *
 * ## Installation
 *
 * ```bash npm2yarn2pnpm
 * npm install next-auth pouchdb pouchdb-find @next-auth/pouchdb-adapter
 * ```
 *
 * @module @next-auth/pouchdb-adapter
 */
/// <reference types="pouchdb-find" />
/// <reference types="pouchdb-core" />
/// <reference types="pouchdb-mapreduce" />
/// <reference types="pouchdb-replication" />
import type { Adapter } from "next-auth/adapters";
type PrefixConfig = Record<"user" | "account" | "session" | "verificationToken", string>;
type IndexConfig = Record<"userByEmail" | "accountByProviderId" | "sessionByToken" | "verificationTokenByToken", string>;
/**
 * Configure the adapter
 */
export interface PouchDBAdapterOptions {
    /**
     * Your PouchDB instance, with the `pouchdb-find` plugin installed.
     * @example
     * ```javascript
     * import PouchDB from "pouchdb"
     *
     * PouchDB
     *   .plugin(require("pouchdb-adapter-leveldb")) // Or any other adapter
     *   .plugin(require("pouchdb-find")) // Don't forget the `pouchdb-find` plugin
     *
     * const pouchdb = new PouchDB("auth_db", { adapter: "leveldb" })
     */
    pouchdb: PouchDB.Database;
    /**
     * Override the default prefix names.
     *
     * @default
     * ```js
     * {
     *   user: "USER",
     *   account: "ACCOUNT",
     *   session: "SESSION",
     *   verificationToken: "VERIFICATION-TOKEN"
     * }
     * ```
     */
    prefixes?: PrefixConfig;
    /**
     * Override the default index names.
     *
     * @default
     * ```js
     * {
     *   userByEmail: "nextAuthUserByEmail",
     *   accountByProviderId: "nextAuthAccountByProviderId",
     *   sessionByToken: "nextAuthSessionByToken",
     *   verificationTokenByToken: "nextAuthVerificationRequestByToken"
     * }
     * ```
     */
    indexes?: IndexConfig;
}
/**
 * :::info
 * Depending on your architecture you can use PouchDB's http adapter to reach any database compliant with the CouchDB protocol (CouchDB, Cloudant, ...) or use any other PouchDB compatible adapter (leveldb, in-memory, ...)
 * :::
 *
 * ## Setup
 *
 * :::note
 * Your PouchDB instance MUST provide the `pouchdb-find` plugin since it is used internally by the adapter to build and manage indexes
 * :::
 *
 * Add this adapter to your `pages/api/auth/[...nextauth].js` next-auth configuration object:
 *
 * ```javascript title="pages/api/auth/[...nextauth].js"
 * import NextAuth from "next-auth"
 * import GoogleProvider from "next-auth/providers/google"
 * import { PouchDBAdapter } from "@next-auth/pouchdb-adapter"
 * import PouchDB from "pouchdb"
 *
 * // Setup your PouchDB instance and database
 * PouchDB
 *   .plugin(require("pouchdb-adapter-leveldb")) // Or any other adapter
 *   .plugin(require("pouchdb-find")) // Don't forget the `pouchdb-find` plugin
 *
 * const pouchdb = new PouchDB("auth_db", { adapter: "leveldb" })
 *
 * // For more information on each option (and a full list of options) go to
 * // https://authjs.dev/reference/configuration/auth-options
 * export default NextAuth({
 *   // https://authjs.dev/reference/providers/
 *   providers: [
 *     GoogleProvider({
 *       clientId: process.env.GOOGLE_ID,
 *       clientSecret: process.env.GOOGLE_SECRET,
 *     }),
 *   ],
 *   adapter: PouchDBAdapter(pouchdb),
 *   // ...
 * })
 * ```
 *
 * ## Advanced usage
 *
 * ### Memory-First Caching Strategy
 *
 * If you need to boost your authentication layer performance, you may use PouchDB's powerful sync features and various adapters, to build a memory-first caching strategy.
 *
 * Use an in-memory PouchDB as your main authentication database, and synchronize it with any other persisted PouchDB. You may do a one way, one-off replication at startup from the persisted PouchDB into the in-memory PouchDB, then two-way, continuous sync.
 *
 * This will most likely not increase performance much in a serverless environment due to various reasons such as concurrency, function startup time increases, etc.
 *
 * For more details, please see https://pouchdb.com/api.html#sync
 *
 */
export declare function PouchDBAdapter(options: PouchDBAdapterOptions): Adapter;
export declare function createIndexes(pouchdb: PouchDB.Database, indexes?: IndexConfig): Promise<void>;
export {};
//# sourceMappingURL=index.d.ts.map