import { RegisterRequest, LoginRequest, AuthResponse } from '@/interfaces/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3000/api/auth';

const handleResponse = async (response: Response): Promise<AuthResponse> => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro inesperado');
    }
    return await response.json();
};

const register = async (data: RegisterRequest): Promise<AuthResponse> => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await handleResponse(response);

        if (responseData.token) {
            await AsyncStorage.setItem('userToken', responseData.token);
        } else {
            throw new Error('Token não recebido. Registro falhou.');
        }

        return responseData;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Erro ao registrar usuário');
        } else {
            throw new Error('Erro desconhecido ao registrar usuário');
        }
    }
};

const login = async (data: LoginRequest): Promise<AuthResponse> => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await handleResponse(response);

        await AsyncStorage.setItem('userToken', responseData.token);

        if (responseData.user.role) {
            await AsyncStorage.setItem('userRole', responseData.user.role);
            console.log("Response Data:", responseData);
        } else {
            console.error("Papel do usuário não encontrado na resposta");
        }

        return responseData;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Erro ao fazer login');
        } else {
            throw new Error('Erro desconhecido ao fazer login');
        }
    }
};

const logout = async (): Promise<void> => {
    await AsyncStorage.removeItem('userToken');
};

const getCurrentUser = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) return null;
    return token;
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
};