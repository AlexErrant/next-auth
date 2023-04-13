/**
 * This file is auto-generated from Xata and corresponds
 * to the database types in the Xata database. Please do not
 * augment by hand.
 */
import { BaseClientOptions, XataRecord, ClientConstructor } from "@xata.io/client";
export interface NextauthUser {
    email?: string | null;
    emailVerified?: Date | null;
    name?: string | null;
    image?: string | null;
}
export declare type NextauthUserRecord = NextauthUser & XataRecord;
export interface NextauthAccount {
    user?: NextauthUserRecord | null;
    type?: string | null;
    provider?: string | null;
    providerAccountId?: string | null;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
}
export declare type NextauthAccountRecord = NextauthAccount & XataRecord;
export interface NextauthVerificationToken {
    identifier?: string | null;
    token?: string | null;
    expires?: Date | null;
}
export declare type NextauthVerificationTokenRecord = NextauthVerificationToken & XataRecord;
export interface NextauthUsersAccount {
    user?: NextauthUserRecord | null;
    account?: NextauthAccountRecord | null;
}
export declare type NextauthUsersAccountRecord = NextauthUsersAccount & XataRecord;
export interface NextauthUsersSession {
    user?: NextauthUserRecord | null;
    session?: NextauthSessionRecord | null;
}
export declare type NextauthUsersSessionRecord = NextauthUsersSession & XataRecord;
export interface NextauthSession {
    sessionToken?: string | null;
    expires?: Date | null;
    user?: NextauthUserRecord | null;
}
export declare type NextauthSessionRecord = NextauthSession & XataRecord;
export declare type DatabaseSchema = {
    nextauth_users: NextauthUser;
    nextauth_accounts: NextauthAccount;
    nextauth_verificationTokens: NextauthVerificationToken;
    nextauth_users_accounts: NextauthUsersAccount;
    nextauth_users_sessions: NextauthUsersSession;
    nextauth_sessions: NextauthSession;
};
declare const DatabaseClient: ClientConstructor<any>;
export declare class XataClient extends DatabaseClient<DatabaseSchema> {
    constructor(options?: BaseClientOptions);
}
export {};
