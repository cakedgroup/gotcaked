export interface User {
    id: string;
    name: string;
    description: string;
    picture_uri: string;
    email: string;
    password: string;
}

export interface UserPublic {
    id: string;
    name: string;
    description: string;
    picture_uri: string;
    email: string;
}

export interface UserLogin {
    email: string;
    password: string;
}