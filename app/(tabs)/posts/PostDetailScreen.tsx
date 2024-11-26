import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { IPost } from "@/interfaces/Post";
import { IComment } from "@/interfaces/Comment";
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import postService from '@/app/services/postService';
import CommentSection from '@/components/CommentSection';

const PostDetailScreen: React.FC = () => {
    const { postId } = useLocalSearchParams();
    const postIdString = Array.isArray(postId) ? postId[0] : postId;
    const [post, setPost] = useState<IPost | null>(null);
    const [comments, setComments] = useState<IComment[]>([]);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState<string | null>(null);
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

        const fetchUserRole = async () => {
            const role = await AsyncStorage.getItem('userRole');
            setUserRole(role);
        };

        if (postIdString) {
            fetchPost();
            fetchComments();
            fetchUserRole();
        }
    }, [postIdString]);

    const handleCommentAdded = (newComment: IComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
    };

    const handleCommentDeleted = (commentId: string) => {
        setComments((prevComments) => prevComments.filter(c => c.id !== commentId));
    };

    const handleReplyAdded = (newReply: IComment) => {
        setComments(prevComments =>
            prevComments.map(comment =>
                comment.id === newReply.parent_id
                    ? { ...comment, replies: [...(comment.replies || []), newReply] }
                    : comment
            )
        );
    };

    const handleLikePost = async () => {
        try {
            const updatedPost = await postService.likePost(postIdString);
            setPost((prevPost) => {
                if (prevPost) {
                    return {
                        ...prevPost,
                        likes: updatedPost.likes,
                    };
                }
                return null;
            });
        } catch (error) {
            console.error('Erro ao dar like no post:', error);
            Alert.alert('Erro', 'Não foi possível dar like no post.');
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

            <Button title={`Curtir (${post?.likes || 0})`} onPress={handleLikePost} color="#FF6B6B" />

            {userRole === 'teacher' && (
                <Button title="Editar Post" onPress={() => router.push(`/posts/EditPostScreen?postId=${post.id}`)} color="#FF6B6B" />
            )}

            <CommentSection
                comments={comments}
                postId={postIdString}
                userRole={userRole}
                onCommentAdded={handleCommentAdded}
                onCommentDeleted={handleCommentDeleted}
                onReplyAdded={handleReplyAdded}
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
    notFound: {
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default PostDetailScreen;