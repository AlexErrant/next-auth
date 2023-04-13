"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = void 0;
const defaultModels = __importStar(require("./models"));
exports.models = defaultModels;
/**
 * :::warning
 * You'll also have to manually install [the driver for your database](https://sequelize.org/master/manual/getting-started.html) of choice.
 * :::
 *
 * ## Setup
 *
 * ### Configuring Auth.js
 *
 *  Add this adapter to your `pages/api/[...nextauth].js` next-auth configuration object.
 *
 * ```javascript title="pages/api/auth/[...nextauth].js"
 * import NextAuth from "next-auth"
 * import SequelizeAdapter from "@next-auth/sequelize-adapter"
 * import { Sequelize } from "sequelize"
 *
 * // https://sequelize.org/master/manual/getting-started.html#connecting-to-a-database
 * const sequelize = new Sequelize("yourconnectionstring")
 *
 * // For more information on each option (and a full list of options) go to
 * // https://authjs.dev/reference/configuration/auth-config
 * export default NextAuth({
 *   // https://authjs.dev/reference/providers/
 *   providers: [],
 *   adapter: SequelizeAdapter(sequelize),
 * })
 * ```
 *
 * ### Updating the database schema
 *
 * By default, the sequelize adapter will not create tables in your database. In production, best practice is to create the [required tables](https://authjs.dev/reference/adapters/models) in your database via [migrations](https://sequelize.org/master/manual/migrations.html). In development, you are able to call [`sequelize.sync()`](https://sequelize.org/master/manual/model-basics.html#model-synchronization) to have sequelize create the necessary tables, foreign keys and indexes:
 *
 * > This schema is adapted for use in Sequelize and based upon our main [schema](https://authjs.dev/reference/adapters#models)
 *
 * ```js
 * import NextAuth from "next-auth"
 * import SequelizeAdapter from "@next-auth/sequelize-adapter"
 * import Sequelize from 'sequelize'
 *
 * const sequelize = new Sequelize("sqlite::memory:")
 * const adapter = SequelizeAdapter(sequelize)
 *
 * // Calling sync() is not recommended in production
 * sequelize.sync()
 *
 * export default NextAuth({
 *   ...
 *   adapter
 *   ...
 * })
 * ```
 *
 * ## Advanced usage
 *
 * ### Using custom models
 *
 * Sequelize models are option to customization like so:
 *
 * ```js
 * import NextAuth from "next-auth"
 * import SequelizeAdapter, { models } from "@next-auth/sequelize-adapter"
 * import Sequelize, { DataTypes } from "sequelize"
 *
 * const sequelize = new Sequelize("sqlite::memory:")
 *
 * export default NextAuth({
 *   // https://authjs.dev/reference/providers/
 *   providers: [],
 *   adapter: SequelizeAdapter(sequelize, {
 *     models: {
 *       User: sequelize.define("user", {
 *         ...models.User,
 *         phoneNumber: DataTypes.STRING,
 *       }),
 *     },
 *   }),
 * })
 * ```
 */
function SequelizeAdapter(client, options) {
    var _a, _b, _c, _d;
    const { models, synchronize = true } = options !== null && options !== void 0 ? options : {};
    const defaultModelOptions = { underscored: true, timestamps: false };
    const { User, Account, Session, VerificationToken } = {
        User: (_a = models === null || models === void 0 ? void 0 : models.User) !== null && _a !== void 0 ? _a : client.define("user", defaultModels.User, defaultModelOptions),
        Account: (_b = models === null || models === void 0 ? void 0 : models.Account) !== null && _b !== void 0 ? _b : client.define("account", defaultModels.Account, defaultModelOptions),
        Session: (_c = models === null || models === void 0 ? void 0 : models.Session) !== null && _c !== void 0 ? _c : client.define("session", defaultModels.Session, defaultModelOptions),
        VerificationToken: (_d = models === null || models === void 0 ? void 0 : models.VerificationToken) !== null && _d !== void 0 ? _d : client.define("verificationToken", defaultModels.VerificationToken, defaultModelOptions),
    };
    let _synced = false;
    const sync = async () => {
        if (process.env.NODE_ENV !== "production" && synchronize && !_synced) {
            const syncOptions = typeof synchronize === "object" ? synchronize : undefined;
            await Promise.all([
                User.sync(syncOptions),
                Account.sync(syncOptions),
                Session.sync(syncOptions),
                VerificationToken.sync(syncOptions),
            ]);
            _synced = true;
        }
    };
    Account.belongsTo(User, { onDelete: "cascade" });
    Session.belongsTo(User, { onDelete: "cascade" });
    return {
        async createUser(user) {
            await sync();
            return await User.create(user);
        },
        async getUser(id) {
            var _a;
            await sync();
            const userInstance = await User.findByPk(id);
            return (_a = userInstance === null || userInstance === void 0 ? void 0 : userInstance.get({ plain: true })) !== null && _a !== void 0 ? _a : null;
        },
        async getUserByEmail(email) {
            var _a;
            await sync();
            const userInstance = await User.findOne({
                where: { email },
            });
            return (_a = userInstance === null || userInstance === void 0 ? void 0 : userInstance.get({ plain: true })) !== null && _a !== void 0 ? _a : null;
        },
        async getUserByAccount({ provider, providerAccountId }) {
            var _a;
            await sync();
            const accountInstance = await Account.findOne({
                where: { provider, providerAccountId },
            });
            if (!accountInstance) {
                return null;
            }
            const userInstance = await User.findByPk(accountInstance.userId);
            return (_a = userInstance === null || userInstance === void 0 ? void 0 : userInstance.get({ plain: true })) !== null && _a !== void 0 ? _a : null;
        },
        async updateUser(user) {
            await sync();
            await User.update(user, { where: { id: user.id } });
            const userInstance = await User.findByPk(user.id);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return userInstance;
        },
        async deleteUser(userId) {
            await sync();
            const userInstance = await User.findByPk(userId);
            await User.destroy({ where: { id: userId } });
            return userInstance;
        },
        async linkAccount(account) {
            await sync();
            await Account.create(account);
        },
        async unlinkAccount({ provider, providerAccountId }) {
            await sync();
            await Account.destroy({
                where: { provider, providerAccountId },
            });
        },
        async createSession(session) {
            await sync();
            return await Session.create(session);
        },
        async getSessionAndUser(sessionToken) {
            await sync();
            const sessionInstance = await Session.findOne({
                where: { sessionToken },
            });
            if (!sessionInstance) {
                return null;
            }
            const userInstance = await User.findByPk(sessionInstance.userId);
            if (!userInstance) {
                return null;
            }
            return {
                session: sessionInstance === null || sessionInstance === void 0 ? void 0 : sessionInstance.get({ plain: true }),
                user: userInstance === null || userInstance === void 0 ? void 0 : userInstance.get({ plain: true }),
            };
        },
        async updateSession({ sessionToken, expires }) {
            await sync();
            await Session.update({ expires, sessionToken }, { where: { sessionToken } });
            return await Session.findOne({ where: { sessionToken } });
        },
        async deleteSession(sessionToken) {
            await sync();
            await Session.destroy({ where: { sessionToken } });
        },
        async createVerificationToken(token) {
            await sync();
            return await VerificationToken.create(token);
        },
        async useVerificationToken({ identifier, token }) {
            var _a;
            await sync();
            const tokenInstance = await VerificationToken.findOne({
                where: { identifier, token },
            });
            await VerificationToken.destroy({ where: { identifier } });
            return (_a = tokenInstance === null || tokenInstance === void 0 ? void 0 : tokenInstance.get({ plain: true })) !== null && _a !== void 0 ? _a : null;
        },
    };
}
exports.default = SequelizeAdapter;
