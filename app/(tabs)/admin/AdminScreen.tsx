import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, Alert, StyleSheet } from 'react-native';
import postService from '@/app/services/postService';
import { IPost } from '@/interfaces/Post';
import { useRouter } from 'expo-router';

const AdminPostListScreen: React.FC = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const router = useRouter();

    const fetchPosts = async () => {
        try {
            const fetchedPosts = await postService.getAllPosts();
            setPosts(fetchedPosts);
        } catch (error) {
            console.error('Erro ao buscar postagens:', error);
            Alert.alert('Erro', 'Não foi possível carregar as postagens.');
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleEdit = (postId: string) => {
        router.push(`/posts/EditPostScreen?postId=${postId}`);
    };

    const handleDelete = async (postId: string) => {
        try {
            await postService.deletePost(postId);
            Alert.alert('Sucesso', 'Postagem excluída com sucesso.');
            fetchPosts(); // Atualiza a lista após a exclusão
        } catch (error) {
            console.error('Erro ao excluir postagem:', error);
            Alert.alert('Erro', 'Não foi possível excluir a postagem.');
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                renderItem={({ item }) => (
                    <View style={styles.postItem}>
                        <Text style={styles.postTitle}>{item.title}</Text>
                        <View style={styles.buttonContainer}>
                            <Button title="Editar" onPress={() => handleEdit(item.id)} />
                            <Button title="Excluir" onPress={() => handleDelete(item.id)} />
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    postItem: {
        marginBottom: 15,
        padding: 15,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});

export default AdminPostListScreen;