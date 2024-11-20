import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { IPost } from "@/interfaces/Post";
import { IComment } from "@/interfaces/Comment";
import CommentItem from '@/components/CommentItem';
import { useRouter } from 'expo-router';

const PostDetailScreen: React.FC = () => {
    const { postId } = useLocalSearchParams();
    const postIdString = Array.isArray(postId) ? postId[0] : postId;
    const [post, setPost] = useState<IPost | null>(null);
    const [comments, setComments] = useState<IComment[]>([]);
    const [loading, setLoading] = useState(true);
    const [commentText, setCommentText] = useState('');
    const [authorName, setAuthorName] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/posts/${postIdString}`);
                if (!response.ok) throw new Error('Erro ao buscar post');
                const data = await response.json();
                setPost(data);
            } catch (error) {
                console.error(error);
                Alert.alert('Erro', 'Não foi possível carregar o post.');
            } finally {
                setLoading(false);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/posts/${postIdString}/comments`);
                if (!response.ok) throw new Error('Erro ao buscar comentários');
                const data = await response.json();
                setComments(data);
            } catch (error) {
                console.error(error);
                Alert.alert('Erro', 'Não foi possível carregar os comentários.');
            }
        };

        if (postIdString) {
            fetchPost();
            fetchComments();
        }
    }, [postIdString]);

    const handleAddComment = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/posts/${postIdString}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ author: authorName, content: commentText }),
            });

            const newComment = await response.json();
            if (response.ok) {
                setComments((prevComments) => [...prevComments, newComment]);
                setCommentText('');
                setAuthorName('');
            } else {
                Alert.alert('Erro', newComment.message);
            }
        } catch (error) {
            console.error('Erro ao adicionar comentário:', error);
            Alert.alert('Erro', 'Não foi possível adicionar o comentário.');
        }
    };

    const handleEditPost = () => {
        if (post) {
            router.push(`/posts/EditPostScreen?postId=${post.id}`);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#FF6B6B" />;
    }

    if (!post) {
        return <Text style={styles.notFound}>Post não encontrado</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.author}>Autor: {post.author}</Text>
            <Text style={styles.content}>{post.content}</Text>

            <Button title="Editar Post" onPress={handleEditPost} color="#FF6B6B" />

            <TextInput
                style={styles.input}
                placeholder="Seu nome"
                value={authorName}
                onChangeText={setAuthorName}
                placeholderTextColor="#A9A9A9"
            />
            <TextInput
                style={styles.input}
                placeholder="Deixe seu comentário..."
                value={commentText}
                onChangeText={setCommentText}
                placeholderTextColor="#A9A9A9"
            />
            <Button title="Comentar" onPress={handleAddComment} color="#FF6B6B" />

            <FlatList
                data={comments}
                renderItem={({ item }) => <CommentItem comment={item} />}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.commentListContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#1A1A1A',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    author: {
        fontSize: 16,
        color: 'gray',
    },
    content: {
        color: '#FFFFFF',
        marginVertical: 12,
    },
    input: {
        height: 40,
        borderColor: '#FF6B6B',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 16,
        backgroundColor: '#2B2B2B',
        color: '#FFFFFF',
    },
    notFound: {
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 20,
    },
    commentListContainer: {
        paddingBottom: 16,
    },
});

export default PostDetailScreen;