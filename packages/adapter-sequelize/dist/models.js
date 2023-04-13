"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationToken = exports.Session = exports.User = exports.Account = void 0;
const sequelize_1 = require("sequelize");
exports.Account = {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    type: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    provider: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    providerAccountId: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    refresh_token: { type: sequelize_1.DataTypes.STRING },
    access_token: { type: sequelize_1.DataTypes.STRING },
    expires_at: { type: sequelize_1.DataTypes.INTEGER },
    token_type: { type: sequelize_1.DataTypes.STRING },
    scope: { type: sequelize_1.DataTypes.STRING },
    id_token: { type: sequelize_1.DataTypes.TEXT },
    session_state: { type: sequelize_1.DataTypes.STRING },
    userId: { type: sequelize_1.DataTypes.UUID },
};
exports.User = {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: { type: sequelize_1.DataTypes.STRING },
    email: { type: sequelize_1.DataTypes.STRING, unique: "email" },
    emailVerified: { type: sequelize_1.DataTypes.DATE },
    image: { type: sequelize_1.DataTypes.STRING },
};
exports.Session = {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    expires: { type: sequelize_1.DataTypes.DATE, allowNull: false },
    sessionToken: {
        type: sequelize_1.DataTypes.STRING,
        unique: "sessionToken",
        allowNull: false,
    },
    userId: { type: sequelize_1.DataTypes.UUID },
};
exports.VerificationToken = {
    token: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
    identifier: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    expires: { type: sequelize_1.DataTypes.DATE, allowNull: false },
};
