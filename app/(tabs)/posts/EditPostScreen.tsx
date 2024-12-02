import React, { useEffect, useState } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import postService from '@/app/services/postService';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { IPost } from '@/interfaces/Post';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '@/components/HeaderFooter/Footer';

const EditPostScreen: React.FC = () => {
    const { postId } = useLocalSearchParams();
    const [post, setPost] = useState<IPost | null>(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const fetchedPost = await postService.getPostById(postId as string);
                if (fetchedPost) {
                    setPost(fetchedPost);
                    setTitle(fetchedPost.title);
                    setContent(fetchedPost.content);
                    setAuthor(fetchedPost.author);
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
            author,
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
            <TouchableOpacity style={styles.saveButton} onPress={handleUpdatePost}>
                <Icon name="floppy-o" size={16} color="#FFFFFF" />
                <Text style={styles.saveButtonText}>Gravar</Text>
            </TouchableOpacity>

            <View style={styles.card}>
                <TextInput
                    placeholder="Título"
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Autor"
                    value={author}
                    onChangeText={setAuthor}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Conteúdo"
                    value={content}
                    onChangeText={setContent}
                    multiline
                    style={[styles.input, { height: 100 }]}
                />
            </View>

            <Footer
                userRole="teacher"
                onHome={() => router.push('/home/HomeScreen')}
                onLogout={() => {/* Handle logout */}}
                onNavigateTo={(screen: string) => router.push(screen as any)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1A1A1A',
        flex: 1,
        margin: 0,
    },
    saveButton: {
        backgroundColor: '#FF6B6B',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        right: 20,
        top: 20,
        elevation: 2,
        zIndex: 1000,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 20,
        marginTop: 120,
        marginHorizontal: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.5,
    },
    input: {
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
});

export default EditPostScreen;