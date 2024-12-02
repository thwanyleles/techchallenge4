import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3000/api';

const commentService = {
    createComment: async (postId: string, author: string, content: string) => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId, author, content }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Erro ao criar comentário:', errorData);
                throw new Error(errorData.message || 'Erro ao criar comentário');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro no serviço de comentário:', error);
            throw error;
        }
    },

    deleteComment: async (commentId: string) => {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch(`${API_URL}/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao excluir comentário');
        }
    },

    replyToComment: async (commentId: string, postId: string, author: string, content: string) => {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch(`${API_URL}/comments/${commentId}/reply`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ author, content, postId }),
        });

        if (!response.ok) {
            throw new Error('Erro ao responder comentário');
        }

        return await response.json();
    },
};

export default commentService;