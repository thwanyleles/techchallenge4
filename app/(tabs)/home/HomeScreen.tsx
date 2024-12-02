import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import useFetchPosts from '@/hooks/useFetchPosts';
import { IPost } from '@/interfaces/Post';
import Footer from '@/components/HeaderFooter/Footer';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService from "@/app/services/authService";
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen: React.FC = () => {
    const { posts, loading } = useFetchPosts();
    const [searchTerm, setSearchTerm] = useState('');
    const [userRole, setUserRole] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserRole = async () => {
            const role = await AsyncStorage.getItem('userRole');
            setUserRole(role);
        };
        fetchUserRole();
    }, []);

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderPostItem = ({ item }: { item: IPost }) => (
        <TouchableOpacity style={styles.postItem} onPress={() => router.push(`/posts/PostDetailScreen?postId=${item.id}`)}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postContent}>{item.content.substring(0, 100)}...</Text>
            <View style={styles.footer}>
                <Text style={styles.postAuthor}>Autor: {item.author}</Text>
                <TouchableOpacity onPress={() => router.push(`/posts/PostDetailScreen?postId=${item.id}`)} style={styles.readMoreButton}>
                    <Icon name="plus" size={16} color="#FF6B6B" />
                    <Text style={styles.readMoreText}>Continuar Lendo</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    const handleLogout = async () => {
        await authService.logout();
        router.push('/auth/LoginScreen');
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#FF6B6B" />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Icon name="search" size={20} color="#A9A9A9" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                        placeholderTextColor="#A9A9A9"
                    />
                </View>
            </View>
            <View style={styles.headerContainer}>
                <Text style={styles.postsTitle}>Últimos Posts</Text>
                {userRole === 'teacher' && (
                    <TouchableOpacity onPress={() => router.push('/posts/CreatePostScreen')} style={styles.createPostButton}>
                        <Icon name="plus" size={16} color="#FFFFFF" />
                        <Text style={styles.createPostButtonText}>Novo Post</Text>
                    </TouchableOpacity>
                )}
            </View>
            <FlatList
                data={filteredPosts}
                renderItem={renderPostItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            />
            <Footer
                userRole={userRole}
                onHome={() => router.push('/')}
                onLogout={handleLogout}
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
    listContainer: {
        paddingBottom: 20,
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
    searchContainer: {
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        margin: 16,
        elevation: 2,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        height: 40,
        flex: 1,
        color: '#000000',
        marginLeft: 10,
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
    readMoreButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    readMoreText: {
        color: '#FF6B6B',
        marginLeft: 5,
    },
});

export default HomeScreen;