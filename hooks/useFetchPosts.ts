import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { IPost } from '@/interfaces/Post';

const useFetchPosts = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/posts');
            if (!response.ok) {
                throw new Error('Erro ao carregar posts');
            }
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Erro ao buscar posts:', error);
            Alert.alert('Erro', 'Não foi possível carregar os posts.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return { posts, loading };
};

export default useFetchPosts;