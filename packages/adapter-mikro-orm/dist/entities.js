"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationToken = exports.Account = exports.Session = exports.User = void 0;
const uuid_1 = require("uuid");
const core_1 = require("@mikro-orm/core");
let User = class User {
    constructor() {
        this.id = (0, uuid_1.v4)();
        this.email = "";
        this.emailVerified = null;
        this.sessions = new core_1.Collection(this);
        this.accounts = new core_1.Collection(this);
    }
};
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)({ type: core_1.types.string, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, core_1.Property)({ type: core_1.types.string, nullable: true }),
    (0, core_1.Unique)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, core_1.Property)({ type: core_1.types.datetime, nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "emailVerified", void 0);
__decorate([
    (0, core_1.Property)({ type: core_1.types.string, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    (0, core_1.OneToMany)({
        entity: "Session",
        mappedBy: (session) => session.user,
        hidden: true,
        orphanRemoval: true,
    }),
    __metadata("design:type", Object)
], User.prototype, "sessions", void 0);
__decorate([
    (0, core_1.OneToMany)({
        entity: "Account",
        mappedBy: (account) => account.user,
        hidden: true,
        orphanRemoval: true,
    }),
    __metadata("design:type", Object)
], User.prototype, "accounts", void 0);
User = __decorate([
    (0, core_1.Entity)()
], User);
exports.User = User;
let Session = class Session {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
};
__decorate([
    (0, core_1.PrimaryKey)(),
    (0, core_1.Property)({ type: core_1.types.string }),
    __metadata("design:type", String)
], Session.prototype, "id", void 0);
__decorate([
    (0, core_1.ManyToOne)({
        entity: "User",
        hidden: true,
        onDelete: "cascade",
    }),
    __metadata("design:type", User)
], Session.prototype, "user", void 0);
__decorate([
    (0, core_1.Property)({ type: core_1.types.string, persist: false }),
    __metadata("design:type", String)
], Session.prototype, "userId", void 0);
__decorate([
    (0, core_1.Property)({ type: "Date" }),
    __metadata("design:type", Date)
], Session.prototype, "expires", void 0);
__decorate([
    (0, core_1.Property)({ type: core_1.types.string }),
    (0, core_1.Unique)(),
    __metadata("design:type", String)
], Session.prototype, "sessionToken", void 0);
Session = __decorate([
    (0, core_1.Entity)()
], Session);
exports.Session = Session;
let Account = class Account {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
};
__decorate([
    (0, core_1.PrimaryKey)(),
    (0, core_1.Property)({ type: core_1.types.string }),
    __metadata("design:type", String)
], Account.prototype, "id", void 0);
__decorate([
    (0, core_1.ManyToOne)({
        entity: "User",
        hidden: true,
        onDelete: "cascade",
    }),
    __metadata("design:type", User)
], Account.prototype, "user", void 0);
__decorate([
    (0, core_1.Property)({ type: core_1.types.string, persist: false }),
    __metadata("design:type", String)
], Account.prototype, "userId", void 0);
__decorate([
    (0, core_1.Property)({ type: core_1.types.string }),
    __metadata("design:type", String)
], Account.prototype, "type", void 0);
__decorate([
    (0, core_1.Property)({ type: core_1.types.string }),
    __metadata("design:type", String)
], Account.prototype, "provider", void 0);
__decorate([
    (0, core_1.Property)({ type: core_1.types.string }),
    __metadata("design:type", String)
], Account.prototype, "providerAccountId", void 0);
__decorate([
    (0, core_1.Property)({ type: core_1.types.string, nullable: true }),
    __metadata("design:type", String)
], Account.prototype, "refresh_token", void 0);
__decorate([
    (0, core_1.Property)({ type: core_1.types.string, nullable: true }),
    __metadata("design:type", String)
], Account.prototype, "access_token", void 0);
__decorate([
    (0, core_1.Property)({ type: core_1.types.integer, nullable: true }),
    __metadata("design:type", Number)
], Account.prototype, "expires_at", void 0);
__decorate([
    (0, core_1.Property)({ type: core_1.types.string, nullable: true }),
    __metadata("design:type", String)
], Account.prototype, "token_type", void 0);
__decorate([
    (0, core_1.Property)({ type: core_1.types.string, nullable: true }),
    __metadata("design:type", String)
], Account.prototype, "scope", void 0);
__decorate([
    (0, core_1.Property)({ type: core_1.types.text, nullable: true }),
    __metadata("design:type", String)
], Account.prototype, "id_token", void 0);
__decorate([
    (0, core_1.Property)({ type: core_1.types.string, nullable: true }),
    __metadata("design:type", String)
], Account.prototype, "session_state", void 0);
Account = __decorate([
    (0, core_1.Entity)(),
    (0, core_1.Unique)({ properties: ["provider", "providerAccountId"] })
], Account);
exports.Account = Account;
let VerificationToken = class VerificationToken {
};
__decorate([
    (0, core_1.PrimaryKey)(),
    (0, core_1.Property)({ type: core_1.types.string }),
    __metadata("design:type", String)
], VerificationToken.prototype, "token", void 0);
__decorate([
    (0, core_1.Property)({ type: "Date" }),
    __metadata("design:type", Date)
], VerificationToken.prototype, "expires", void 0);
__decorate([
    (0, core_1.Property)({ type: core_1.types.string }),
    __metadata("design:type", String)
], VerificationToken.prototype, "identifier", void 0);
VerificationToken = __decorate([
    (0, core_1.Entity)(),
    (0, core_1.Unique)({ properties: ["token", "identifier"] })
], VerificationToken);
exports.VerificationToken = VerificationToken;
