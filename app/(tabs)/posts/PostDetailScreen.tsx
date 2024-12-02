import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { IPost } from "@/interfaces/Post";
import { IComment } from "@/interfaces/Comment";
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import postService from '@/app/services/postService';
import CommentSection from '@/components/CommentSection';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '@/components/HeaderFooter/Footer';

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
            <View style={styles.headerContainer}>
                <Text style={styles.postsTitle}>Detalhes do Post</Text>
                {userRole === 'teacher' && (
                    <TouchableOpacity onPress={() => router.push('/posts/CreatePostScreen')} style={styles.createPostButton}>
                        <Icon name="plus" size={16} color="#FFFFFF" />
                        <Text style={styles.createPostButtonText}>Novo Post</Text>
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.card}>
                <Text style={styles.title}>{post.title}</Text>
                <Text style={styles.content}>{post.content}</Text>
                <View style={styles.footer}>
                    <Text style={styles.author}>Autor: {post.author}</Text>
                    <TouchableOpacity onPress={handleLikePost} style={styles.likeButton}>
                        <Icon name="heart" size={16} color="#FF6B6B" />
                        <Text style={styles.likeText}>Curtir ({post?.likes || 0})</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <CommentSection
                comments={comments}
                postId={postIdString}
                userRole={userRole}
                onCommentAdded={handleCommentAdded}
                onCommentDeleted={handleCommentDeleted}
                onReplyAdded={handleReplyAdded}
            />

            <Footer
                userRole={userRole}
                onHome={() => router.push('/')}
                onLogout={() => router.push('/auth/LoginScreen')}
                onNavigateTo={(screen: string) => router.push(screen as any)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        backgroundColor: '#1A1A1A',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
        paddingTop: 10,
    },
    postsTitle: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    createPostButton: {
        backgroundColor: '#FF6B6B',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    createPostButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.5,
        marginBottom: 20,
        marginHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: 8,
    },
    content: {
        color: '#1A1A1A',
        marginVertical: 12,
        lineHeight: 20,
        textAlign: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    author: {
        fontSize: 16,
        color: 'gray',
    },
    likeButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    likeText: {
        color: '#FF6B6B',
        marginLeft: 5,
    },
    notFound: {
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default PostDetailScreen;