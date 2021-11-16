export interface JWTBlacklistItem {
    id: string;
    jwt: string;
}

export interface JWTContent {
    id: string | undefined;
    email: string | undefined;
    role: string | undefined;
}