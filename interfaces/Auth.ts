export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    role: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        username: string;
        email: string;
        role: string;
    };
}