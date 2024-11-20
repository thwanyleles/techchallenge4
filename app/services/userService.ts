import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from "@/interfaces/User";

const API_URL = 'http://localhost:3000/api/users';

const getUserById = async (userId: string): Promise<User | null> => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch(`${API_URL}/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar usuário');
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return null;
    }
};

const updateUser = async (userId: string, userData: Partial<User>): Promise<User | null> => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch(`${API_URL}/${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar usuário');
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return null;
    }
};

const listAllUsers = async (): Promise<User[]> => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar usuários');
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        return [];
    }
};

const deleteUser = async (userId: string): Promise<void> => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch(`${API_URL}/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao excluir usuário');
        }
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        throw error;
    }
};

export default {
    getUserById,
    updateUser,
    listAllUsers,
    deleteUser,
};