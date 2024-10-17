import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { IComment } from '@/interfaces/Comment';

const useComments = (postId: string) => {
    const [comments, setComments] = useState<IComment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/posts/${postId}/comments`);
                if (!response.ok) throw new Error('Erro ao buscar comentários');
                const data = await response.json();
                setComments(data);
            } catch (error) {
                console.error(error);
                Alert.alert('Erro', 'Não foi possível carregar os comentários.');
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [postId]);

    const addComment = async (author: string, content: string) => {
        try {
            const response = await fetch(`http://localhost:3000/api/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ author, content }),
            });

            const newComment = await response.json();
            if (response.ok) {
                setComments((prevComments) => [...prevComments, newComment]);
            } else {
                Alert.alert('Erro', newComment.message);
            }
        } catch (error) {
            console.error('Erro ao adicionar comentário:', error);
            Alert.alert('Erro', 'Não foi possível adicionar o comentário.');
        }
    };

    return { comments, loading, addComment };
};

export default useComments;