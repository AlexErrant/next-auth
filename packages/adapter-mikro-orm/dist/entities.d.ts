import { Collection } from "@mikro-orm/core";
import type { AdapterUser, AdapterAccount, AdapterSession, VerificationToken as AdapterVerificationToken } from "next-auth/adapters";
import type { ProviderType } from "next-auth/providers";
type RemoveIndex<T> = {
    [K in keyof T as {} extends Record<K, 1> ? never : K]: T[K];
};
export declare class User implements RemoveIndex<AdapterUser> {
    id: string;
    name?: string;
    email: string;
    emailVerified: Date | null;
    image?: string;
    sessions: Collection<Session, object>;
    accounts: Collection<Account, object>;
}
export declare class Session implements AdapterSession {
    id: string;
    user: User;
    userId: string;
    expires: Date;
    sessionToken: string;
}
export declare class Account implements RemoveIndex<AdapterAccount> {
    id: string;
    user: User;
    userId: string;
    type: ProviderType;
    provider: string;
    providerAccountId: string;
    refresh_token?: string;
    access_token?: string;
    expires_at?: number;
    token_type?: string;
    scope?: string;
    id_token?: string;
    session_state?: string;
}
export declare class VerificationToken implements AdapterVerificationToken {
    token: string;
    expires: Date;
    identifier: string;
}
export {};
