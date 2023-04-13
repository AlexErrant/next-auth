export declare class UserEntity {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: string | null;
    image: string | null;
    sessions: SessionEntity[];
    accounts: AccountEntity[];
}
export declare class AccountEntity {
    id: string;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
    user: UserEntity;
}
export declare class SessionEntity {
    id: string;
    sessionToken: string;
    userId: string;
    expires: string;
    user: UserEntity;
}
export declare class VerificationTokenEntity {
    id: string;
    token: string;
    identifier: string;
    expires: string;
}
