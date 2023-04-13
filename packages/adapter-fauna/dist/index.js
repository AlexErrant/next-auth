"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaunaAdapter = exports.query = exports.format = exports.indexes = exports.collections = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
const faunadb_1 = require("faunadb");
exports.collections = {
    Users: (0, faunadb_1.Collection)("users"),
    Accounts: (0, faunadb_1.Collection)("accounts"),
    Sessions: (0, faunadb_1.Collection)("sessions"),
    VerificationTokens: (0, faunadb_1.Collection)("verification_tokens"),
};
exports.indexes = {
    AccountByProviderAndProviderAccountId: (0, faunadb_1.Index)("account_by_provider_and_provider_account_id"),
    UserByEmail: (0, faunadb_1.Index)("user_by_email"),
    SessionByToken: (0, faunadb_1.Index)("session_by_session_token"),
    VerificationTokenByIdentifierAndToken: (0, faunadb_1.Index)("verification_token_by_identifier_and_token"),
    SessionsByUser: (0, faunadb_1.Index)("sessions_by_user_id"),
    AccountsByUser: (0, faunadb_1.Index)("accounts_by_user_id"),
};
exports.format = {
    /** Takes a plain old JavaScript object and turns it into a Fauna object */
    to(object) {
        const newObject = {};
        for (const key in object) {
            const value = object[key];
            if (value instanceof Date) {
                newObject[key] = (0, faunadb_1.Time)(value.toISOString());
            }
            else {
                newObject[key] = value;
            }
        }
        return newObject;
    },
    /** Takes a Fauna object and returns a plain old JavaScript object */
    from(object) {
        const newObject = {};
        for (const key in object) {
            const value = object[key];
            if ((value === null || value === void 0 ? void 0 : value.value) && typeof value.value === "string") {
                newObject[key] = new Date(value.value);
            }
            else {
                newObject[key] = value;
            }
        }
        return newObject;
    },
};
/**
 * Fauna throws an error when something is not found in the db,
 * `next-auth` expects `null` to be returned
 */
function query(f, format) {
    return async function (expr) {
        var _a;
        try {
            const result = await f.query(expr);
            if (!result)
                return null;
            return format({ ...result.data, id: result.ref.id });
        }
        catch (error) {
            if (error.name === "NotFound")
                return null;
            if ((_a = error.description) === null || _a === void 0 ? void 0 : _a.includes("Number or numeric String expected"))
                return null;
            if (process.env.NODE_ENV === "test")
                console.error(error);
            throw error;
        }
    };
}
exports.query = query;
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
function FaunaAdapter(f) {
    const { Users, Accounts, Sessions, VerificationTokens } = exports.collections;
    const { AccountByProviderAndProviderAccountId, AccountsByUser, SessionByToken, SessionsByUser, UserByEmail, VerificationTokenByIdentifierAndToken, } = exports.indexes;
    const { to, from } = exports.format;
    const q = query(f, from);
    return {
        createUser: async (data) => (await q((0, faunadb_1.Create)(Users, { data: to(data) }))),
        getUser: async (id) => await q((0, faunadb_1.Get)((0, faunadb_1.Ref)(Users, id))),
        getUserByEmail: async (email) => await q((0, faunadb_1.Get)((0, faunadb_1.Match)(UserByEmail, email))),
        async getUserByAccount({ provider, providerAccountId }) {
            const key = [provider, providerAccountId];
            const ref = (0, faunadb_1.Match)(AccountByProviderAndProviderAccountId, key);
            const user = await q((0, faunadb_1.Let)({ ref }, (0, faunadb_1.If)((0, faunadb_1.Exists)((0, faunadb_1.Var)("ref")), (0, faunadb_1.Get)((0, faunadb_1.Ref)(Users, (0, faunadb_1.Select)(["data", "userId"], (0, faunadb_1.Get)((0, faunadb_1.Var)("ref"))))), null)));
            return user;
        },
        updateUser: async (data) => (await q((0, faunadb_1.Update)((0, faunadb_1.Ref)(Users, data.id), { data: to(data) }))),
        async deleteUser(userId) {
            await f.query((0, faunadb_1.Do)((0, faunadb_1.Foreach)((0, faunadb_1.Paginate)((0, faunadb_1.Match)(SessionsByUser, userId)), (0, faunadb_1.Lambda)("ref", (0, faunadb_1.Delete)((0, faunadb_1.Var)("ref")))), (0, faunadb_1.Foreach)((0, faunadb_1.Paginate)((0, faunadb_1.Match)(AccountsByUser, userId)), (0, faunadb_1.Lambda)("ref", (0, faunadb_1.Delete)((0, faunadb_1.Var)("ref")))), (0, faunadb_1.Delete)((0, faunadb_1.Ref)(Users, userId))));
        },
        linkAccount: async (data) => (await q((0, faunadb_1.Create)(Accounts, { data: to(data) }))),
        async unlinkAccount({ provider, providerAccountId }) {
            const id = [provider, providerAccountId];
            await q((0, faunadb_1.Delete)((0, faunadb_1.Select)("ref", (0, faunadb_1.Get)((0, faunadb_1.Match)(AccountByProviderAndProviderAccountId, id)))));
        },
        createSession: async (data) => (await q((0, faunadb_1.Create)(Sessions, { data: to(data) }))),
        async getSessionAndUser(sessionToken) {
            const session = await q((0, faunadb_1.Get)((0, faunadb_1.Match)(SessionByToken, sessionToken)));
            if (!session)
                return null;
            const user = await q((0, faunadb_1.Get)((0, faunadb_1.Ref)(Users, session.userId)));
            return { session, user: user };
        },
        async updateSession(data) {
            const ref = (0, faunadb_1.Select)("ref", (0, faunadb_1.Get)((0, faunadb_1.Match)(SessionByToken, data.sessionToken)));
            return await q((0, faunadb_1.Update)(ref, { data: to(data) }));
        },
        async deleteSession(sessionToken) {
            await q((0, faunadb_1.Delete)((0, faunadb_1.Select)("ref", (0, faunadb_1.Get)((0, faunadb_1.Match)(SessionByToken, sessionToken)))));
        },
        async createVerificationToken(data) {
            // @ts-expect-error
            const { id: _id, ...verificationToken } = await q((0, faunadb_1.Create)(VerificationTokens, { data: to(data) }));
            return verificationToken;
        },
        async useVerificationToken({ identifier, token }) {
            const key = [identifier, token];
            const object = (0, faunadb_1.Get)((0, faunadb_1.Match)(VerificationTokenByIdentifierAndToken, key));
            const verificationToken = await q(object);
            if (!verificationToken)
                return null;
            // Verification tokens can be used only once
            await q((0, faunadb_1.Delete)((0, faunadb_1.Select)("ref", object)));
            // @ts-expect-error
            delete verificationToken.id;
            return verificationToken;
        },
    };
}
exports.FaunaAdapter = FaunaAdapter;
