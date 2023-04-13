/**
 * <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16}}>
 *  <p style={{fontWeight: "normal"}}>Official <a href="https://xata.io/docs/overview">Xata</a> adapter for Auth.js / NextAuth.js.</p>
 *  <a href="https://xata.io/">
 *   <img style={{display: "block"}} src="https://authjs.dev/img/adapters/xata.svg" width="50"/>
 *  </a>
 * </div>
 *
 * ## Installation
 *
 * ```bash npm2yarn2pnpm
 * # Install Auth.js and the Xata adapter
 * npm install next-auth @next-auth/xata-adapter
 *
 * # Install the Xata CLI globally if you don't already have it
 * npm install --location=global @xata.io/cli
 *
 * # Login
 * xata auth login
 * ```
 *
 * @module @next-auth/xata-adapter
 */
import type { Adapter } from "next-auth/adapters";
import type { XataClient } from "./xata";
/**
 * ## Setup
 *
 * This adapter allows using Auth.js with Xata as a database to store users, sessions, and more. The preferred way to create a Xata project and use Xata databases is using the [Xata Command Line Interface (CLI)](https://docs.xata.io/cli/getting-started).
 *
 * The CLI allows generating a `XataClient` that will help you work with Xata in a safe way, and that this adapter depends on.
 *
 * When you're ready, let's create a new Xata project using our Auth.js schema that the Xata adapter can work with. To do that, copy and paste this schema file into your project's directory:
 *
 * ```json title="schema.json"
 * {
 *   "tables": [
 *     {
 *       "name": "nextauth_users",
 *       "columns": [
 *         {
 *           "name": "email",
 *           "type": "email"
 *         },
 *         {
 *           "name": "emailVerified",
 *           "type": "datetime"
 *         },
 *         {
 *           "name": "name",
 *           "type": "string"
 *         },
 *         {
 *           "name": "image",
 *           "type": "string"
 *         }
 *       ]
 *     },
 *     {
 *       "name": "nextauth_accounts",
 *       "columns": [
 *         {
 *           "name": "user",
 *           "type": "link",
 *           "link": {
 *             "table": "nextauth_users"
 *           }
 *         },
 *         {
 *           "name": "type",
 *           "type": "string"
 *         },
 *         {
 *           "name": "provider",
 *           "type": "string"
 *         },
 *         {
 *           "name": "providerAccountId",
 *           "type": "string"
 *         },
 *         {
 *           "name": "refresh_token",
 *           "type": "string"
 *         },
 *         {
 *           "name": "access_token",
 *           "type": "string"
 *         },
 *         {
 *           "name": "expires_at",
 *           "type": "int"
 *         },
 *         {
 *           "name": "token_type",
 *           "type": "string"
 *         },
 *         {
 *           "name": "scope",
 *           "type": "string"
 *         },
 *         {
 *           "name": "id_token",
 *           "type": "text"
 *         },
 *         {
 *           "name": "session_state",
 *           "type": "string"
 *         }
 *       ]
 *     },
 *     {
 *       "name": "nextauth_verificationTokens",
 *       "columns": [
 *         {
 *           "name": "identifier",
 *           "type": "string"
 *         },
 *         {
 *           "name": "token",
 *           "type": "string"
 *         },
 *         {
 *           "name": "expires",
 *           "type": "datetime"
 *         }
 *       ]
 *     },
 *     {
 *       "name": "nextauth_users_accounts",
 *       "columns": [
 *         {
 *           "name": "user",
 *           "type": "link",
 *           "link": {
 *             "table": "nextauth_users"
 *           }
 *         },
 *         {
 *           "name": "account",
 *           "type": "link",
 *           "link": {
 *             "table": "nextauth_accounts"
 *           }
 *         }
 *       ]
 *     },
 *     {
 *       "name": "nextauth_users_sessions",
 *       "columns": [
 *         {
 *           "name": "user",
 *           "type": "link",
 *           "link": {
 *             "table": "nextauth_users"
 *           }
 *         },
 *         {
 *           "name": "session",
 *           "type": "link",
 *           "link": {
 *             "table": "nextauth_sessions"
 *           }
 *         }
 *       ]
 *     },
 *     {
 *       "name": "nextauth_sessions",
 *       "columns": [
 *         {
 *           "name": "sessionToken",
 *           "type": "string"
 *         },
 *         {
 *           "name": "expires",
 *           "type": "datetime"
 *         },
 *         {
 *           "name": "user",
 *           "type": "link",
 *           "link": {
 *             "table": "nextauth_users"
 *           }
 *         }
 *       ]
 *     }
 *   ]
 * }
 * ```
 *
 * Now, run the following command:
 *
 * ```bash
 * xata init --schema=./path/to/your/schema.json
 * ```
 *
 * The CLI will walk you through a setup process where you choose a [workspace](https://docs.xata.io/concepts/workspaces) (kind of like a GitHub org or a Vercel team) and an appropriate database. We recommend using a fresh database for this, as we'll augment it with tables that Auth.js needs.
 *
 * Once you're done, you can continue using Auth.js in your project as expected, like creating a `./pages/api/auth/[...nextauth]` route.
 *
 * ```typescript title="pages/api/auth/[...nextauth].ts"
 * import NextAuth from "next-auth"
 * import GoogleProvider from "next-auth/providers/google"
 *
 * const client = new XataClient()
 *
 * export default NextAuth({
 *   providers: [
 *     GoogleProvider({
 *       clientId: process.env.GOOGLE_CLIENT_ID,
 *       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
 *     }),
 *   ],
 * })
 * ```
 *
 * Now to Xata-fy this route, let's add the Xata client and adapter:
 *
 * ```diff
 * import NextAuth from "next-auth"
 * import GoogleProvider from "next-auth/providers/google"
 * +import { XataAdapter } from "@next-auth/xata-adapter"
 * +import { XataClient } from "../../../xata" // or wherever you've chosen to create the client
 *
 * +const client = new XataClient()
 *
 * export default NextAuth({
 * + adapter: XataAdapter(client),
 *   providers: [
 *     GoogleProvider({
 *       clientId: process.env.GOOGLE_CLIENT_ID,
 *       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
 *     }),
 *   ],
 * })
 * ```
 *
 * This fully sets up your Auth.js app to work with Xata.
 */
export declare function XataAdapter(client: XataClient): Adapter;
