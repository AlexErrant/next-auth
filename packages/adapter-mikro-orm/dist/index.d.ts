/**
 * <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16}}>
 *  <p style={{fontWeight: "normal"}}>Official <a href="https://mikro-orm.io/docs/installation">MikroORM</a> adapter for Auth.js / NextAuth.js.</p>
 *  <a href="https://mikro-orm.io/">
 *   <img style={{display: "block"}} src="https://authjs.dev/img/adapters/mikro-orm.svg" width="140"/>
 *  </a>
 * </div>
 *
 * ## Installation
 *
 * ```bash npm2yarn2pnpm
 * npm install next-auth @next-auth/dynamodb-adapter @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
 * ```
 *
 * @module @next-auth/dynamodb-adapter
 */
import type { Connection, IDatabaseDriver, Options as ORMOptions } from "@mikro-orm/core";
import type { Adapter } from "next-auth/adapters";
import * as defaultEntities from "./entities";
export { defaultEntities };
/**
 * ## Setup
 *
 * Configure Auth.js to use the MikroORM Adapter:
 *
 * ```typescript title="pages/api/auth/[...nextauth].ts"
 * import NextAuth from "next-auth"
 * import { MikroOrmAdapter } from "@next-auth/mikro-orm-adapter"
 *
 * export default NextAuth({
 *   adapter: MikroOrmAdapter({
 *     // MikroORM options object. Ref: https://mikro-orm.io/docs/next/configuration#driver
 *     dbName: "./db.sqlite",
 *     type: "sqlite",
 *     debug: process.env.DEBUG === "true" || process.env.DEBUG?.includes("db"),
 *   }),
 *   providers: [],
 * })
 * ```
 *
 * ## Advanced usage
 *
 * ### Passing custom entities
 *
 * The MikroORM adapter ships with its own set of entities. If you'd like to extend them, you can optionally pass them to the adapter.
 *
 * > This schema is adapted for use in MikroORM and based upon our main [schema](https://authjs.dev/reference/adapters#models)
 *
 * ```typescript title="pages/api/auth/[...nextauth].ts"
 * import config from "config/mikro-orm.ts"
 * import {
 *   Cascade,
 *   Collection,
 *   Entity,
 *   OneToMany,
 *   PrimaryKey,
 *   Property,
 *   Unique,
 * } from "@mikro-orm/core"
 * import { defaultEntities } from "@next-auth/mikro-orm-adapter"
 *
 * const { Account, Session } = defaultEntities
 *
 * @Entity()
 * export class User implements defaultEntities.User {
 *   @PrimaryKey()
 *   id: string = randomUUID()
 *
 *   @Property({ nullable: true })
 *   name?: string
 *
 *   @Property({ nullable: true })
 *   @Unique()
 *   email?: string
 *
 *   @Property({ type: "Date", nullable: true })
 *   emailVerified: Date | null = null
 *
 *   @Property({ nullable: true })
 *   image?: string
 *
 *   @OneToMany({
 *     entity: () => Session,
 *     mappedBy: (session) => session.user,
 *     hidden: true,
 *     orphanRemoval: true,
 *     cascade: [Cascade.ALL],
 *   })
 *   sessions = new Collection<Session>(this)
 *
 *   @OneToMany({
 *     entity: () => Account,
 *     mappedBy: (account) => account.user,
 *     hidden: true,
 *     orphanRemoval: true,
 *     cascade: [Cascade.ALL],
 *   })
 *   accounts = new Collection<Account>(this)
 *
 *   @Enum({ hidden: true })
 *   role = "ADMIN"
 * }
 *
 * export default NextAuth({
 *   adapter: MikroOrmAdapter(config, { entities: { User } }),
 * })
 * ```
 *
 * ### Including default entities
 *
 * You may want to include the defaultEntities in your MikroORM configuration to include them in Migrations etc.
 *
 * To achieve that include them in your "entities" array:
 *
 * ```typescript title="config/mikro-orm.ts"
 * import { Options } from "@mikro-orm/core";
 * import { defaultEntities } from "@next-auth/mikro-orm-adapter"
 *
 * const config: Options = {
 *   ...
 *   entities: [VeryImportantEntity, ...Object.values(defaultEntities)],
 * };
 *
 * export default config;
 * ```
 */
export declare function MikroOrmAdapter<D extends IDatabaseDriver<Connection> = IDatabaseDriver<Connection>>(ormOptions: ORMOptions<D>, options?: {
    entities?: Partial<typeof defaultEntities>;
}): Adapter;
