import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3000/api/posts';

const postService = {
    createPost: async (postData: { title: string; content: string; author: string }) => {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });

        if (!response.ok) {
            throw new Error('Erro ao criar postagem');
        }

        return await response.json();
    },

    getPostById: async (postId: string) => {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch(`${API_URL}/${postId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar post');
        }

        return await response.json();
    },

    updatePost: async (postId: string, postData: { title: string; content: string }) => {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch(`${API_URL}/${postId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar post');
        }

        return await response.json();
    },

    deletePost: async (postId: string) => {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch(`${API_URL}/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao excluir post');
        }

        return await response.json();
    },

    getAllPosts: async () => {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar todos os posts');
        }

        return await response.json();
    },

    likePost: async (postId: string) => {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch(`${API_URL}/${postId}/like`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao dar like no post');
        }

        return await response.json();
    },
};

export default postService;