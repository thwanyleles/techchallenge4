import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import postService from '@/app/services/postService';
import { IPost } from '@/interfaces/Post';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '@/components/HeaderFooter/Footer';

const AdminPostListScreen: React.FC = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const router = useRouter();
    const [userRole, setUserRole] = useState<string | null>('teacher');

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
            fetchPosts();
        } catch (error) {
            console.error('Erro ao excluir postagem:', error);
            Alert.alert('Erro', 'Não foi possível excluir a postagem.');
        }
    };

    const renderPostItem = ({ item }: { item: IPost }) => (
        <TouchableOpacity style={styles.postItem}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postContent}>{item.content.substring(0, 100)}...</Text>
            <View style={styles.footer}>
                <Text style={styles.postAuthor}>Autor: {item.author}</Text>
                <View style={styles.actionButtons}>
                    <TouchableOpacity onPress={() => handleEdit(item.id)} style={styles.editButton}>
                        <Icon name="edit" size={16} color="#FF6B6B" />
                        <Text style={styles.editText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                        <Icon name="trash" size={16} color="#FF6B6B" />
                        <Text style={styles.deleteText}>Excluir</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => router.push('/posts/CreatePostScreen')} style={styles.createPostButton}>
                    <Icon name="plus" size={16} color="#FFFFFF" />
                    <Text style={styles.createPostButtonText}>Novo Post</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={posts}
                renderItem={renderPostItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
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
        backgroundColor: '#1A1A1A',
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingTop: 10,
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
    listContainer: {
        paddingBottom: 20,
    },
    postItem: {
        marginBottom: 15,
        marginHorizontal: 20,
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.5,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    postContent: {
        color: '#1A1A1A',
        marginVertical: 8,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    postAuthor: {
        fontSize: 14,
        color: 'gray',
    },
    actionButtons: {
        flexDirection: 'row',
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    editText: {
        color: '#FF6B6B',
        marginLeft: 5,
    },
    deleteButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    deleteText: {
        color: '#FF6B6B',
        marginLeft: 5,
    },
});

export default AdminPostListScreen;