/**
 * <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16}}>
 *  <p style={{fontWeight: "normal"}}>Official <a href="https://docs.fauna.com/fauna/current/">Fauna</a> adapter for Auth.js / NextAuth.js.</p>
 *  <a href="https://fauna.com/features">
 *   <img style={{display: "block"}} src="https://authjs.dev/img/adapters/fauna.svg" height="30"/>
 *  </a>
 * </div>
 *
 * ## Installation
 *
 * ```bash npm2yarn2pnpm
 * npm install next-auth @next-auth/fauna-adapter faunadb
 * ```
 *
 * @module @next-auth/fauna-adapter
 */
import { Client as FaunaClient, ExprArg } from "faunadb";
import { Adapter } from "next-auth/adapters";
export declare const collections: {
    readonly Users: import("faunadb").Expr;
    readonly Accounts: import("faunadb").Expr;
    readonly Sessions: import("faunadb").Expr;
    readonly VerificationTokens: import("faunadb").Expr;
};
export declare const indexes: {
    readonly AccountByProviderAndProviderAccountId: import("faunadb").Expr;
    readonly UserByEmail: import("faunadb").Expr;
    readonly SessionByToken: import("faunadb").Expr;
    readonly VerificationTokenByIdentifierAndToken: import("faunadb").Expr;
    readonly SessionsByUser: import("faunadb").Expr;
    readonly AccountsByUser: import("faunadb").Expr;
};
export declare const format: {
    /** Takes a plain old JavaScript object and turns it into a Fauna object */
    to(object: Record<string, any>): Record<string, unknown>;
    /** Takes a Fauna object and returns a plain old JavaScript object */
    from<T = Record<string, unknown>>(object: Record<string, any>): T;
};
/**
 * Fauna throws an error when something is not found in the db,
 * `next-auth` expects `null` to be returned
 */
export declare function query(f: FaunaClient, format: (...args: any) => any): <T>(expr: ExprArg) => Promise<T | null>;
/**
 *
 * ## Setup
 *
 * This is the Fauna Adapter for [`next-auth`](https://authjs.dev). This package can only be used in conjunction with the primary `next-auth` package. It is not a standalone package.
 *
 * You can find the Fauna schema and seed information in the docs at [authjs.dev/reference/adapters/fauna](https://authjs.dev/reference/adapters/fauna).
 *
 * ### Configure Auth.js
 *
 * ```javascript title="pages/api/auth/[...nextauth].js"
 * import NextAuth from "next-auth"
 * import { Client as FaunaClient } from "faunadb"
 * import { FaunaAdapter } from "@next-auth/fauna-adapter"
 *
 * const client = new FaunaClient({
 *   secret: "secret",
 *   scheme: "http",
 *   domain: "localhost",
 *   port: 8443,
 * })
 *
 * // For more information on each option (and a full list of options) go to
 * // https://authjs.dev/reference/configuration/auth-options
 * export default NextAuth({
 *   // https://authjs.dev/reference/providers/
 *   providers: [],
 *   adapter: FaunaAdapter(client)
 *   ...
 * })
 * ```
 *
 * ### Schema
 *
 * Run the following commands inside of the `Shell` tab in the Fauna dashboard to setup the appropriate collections and indexes.
 *
 * ```javascript
 * CreateCollection({ name: "accounts" })
 * CreateCollection({ name: "sessions" })
 * CreateCollection({ name: "users" })
 * CreateCollection({ name: "verification_tokens" })
 * ```
 *
 * ```javascript
 * CreateIndex({
 *   name: "account_by_provider_and_provider_account_id",
 *   source: Collection("accounts"),
 *   unique: true,
 *   terms: [
 *     { field: ["data", "provider"] },
 *     { field: ["data", "providerAccountId"] },
 *   ],
 * })
 * CreateIndex({
 *   name: "session_by_session_token",
 *   source: Collection("sessions"),
 *   unique: true,
 *   terms: [{ field: ["data", "sessionToken"] }],
 * })
 * CreateIndex({
 *   name: "user_by_email",
 *   source: Collection("users"),
 *   unique: true,
 *   terms: [{ field: ["data", "email"] }],
 * })
 * CreateIndex({
 *   name: "verification_token_by_identifier_and_token",
 *   source: Collection("verification_tokens"),
 *   unique: true,
 *   terms: [{ field: ["data", "identifier"] }, { field: ["data", "token"] }],
 * })
 * ```
 *
 * > This schema is adapted for use in Fauna and based upon our main [schema](https://authjs.dev/reference/adapters#models)
 **/
export declare function FaunaAdapter(f: FaunaClient): Adapter;
