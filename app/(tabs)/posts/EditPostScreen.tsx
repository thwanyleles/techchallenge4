import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import postService from '@/app/services/postService';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { IPost } from '@/interfaces/Post';

const EditPostScreen: React.FC = () => {
    const { postId } = useLocalSearchParams();
    const [post, setPost] = useState<IPost | null>(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const fetchedPost = await postService.getPostById(postId as string);
                if (fetchedPost) {
                    setPost(fetchedPost);
                    setTitle(fetchedPost.title);
                    setContent(fetchedPost.content);
                } else {
                    Alert.alert('Erro', 'Post não encontrado.');
                }
            } catch (error) {
                console.error('Erro ao buscar post:', error);
                Alert.alert('Erro', 'Não foi possível carregar os dados do post.');
            }
        };

        if (postId) {
            fetchPost();
        }
    }, [postId]);

    const handleUpdatePost = async () => {
        if (!post) return;

        const updatedPost = {
            ...post,
            title,
            content,
        };

        try {
            await postService.updatePost(post.id, updatedPost);
            Alert.alert('Sucesso', 'Post atualizado com sucesso.', [
                {
                    text: 'OK',
                    onPress: () => {
                        router.push(`/posts/PostDetailScreen?postId=${post.id}`);
                    }
                }
            ]);
        } catch (error) {
            console.error('Erro ao atualizar post:', error);
            Alert.alert('Erro', 'Não foi possível atualizar o post.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Título"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Conteúdo"
                value={content}
                onChangeText={setContent}
                multiline
            />
            <Button title="Atualizar Post" onPress={handleUpdatePost} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    input: {
        height: 40,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
});

export default EditPostScreen;