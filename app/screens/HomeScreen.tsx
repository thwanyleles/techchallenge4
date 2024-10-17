import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import useFetchPosts from '@/hooks/useFetchPosts';
import { IPost } from '@/interfaces/Post';
import SearchBar from '@/components/SearchBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useRouter} from "expo-router";

const HomeScreen: React.FC = () => {
    const { posts, loading } = useFetchPosts();
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) || // Filtra pelo autor
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderPostItem = ({ item }: { item: IPost }) => (
        <TouchableOpacity style={styles.postItem} onPress={() => {/* Navegar para a página de leitura do post */}}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postContent}>{item.content.substring(0, 100)}...</Text>
            <View style={styles.footer}>
                <Text style={styles.postAuthor}>Autor: {item.author}</Text>
                <TouchableOpacity onPress={() => router.push(`/screens/PostDetailScreen?postId=${item.id}`)} style={styles.readMoreButton}>
                    <Icon name="plus" size={16} color="#FF6B6B" />
                    <Text style={styles.readMoreText}>Continuar Lendo</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#FF6B6B" />;
    }

    return (
        <View style={styles.container}>
            <SearchBar
                searchTerm={searchTerm}
                onSearch={setSearchTerm}
            />
            <FlatList
                data={filteredPosts}
                renderItem={renderPostItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#1A1A1A',
        flex: 1,
    },
    listContainer: {
        paddingBottom: 16,
    },
    postItem: {
        marginBottom: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#FF6B6B',
        borderRadius: 8,
        backgroundColor: '#2B2B2B',
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    postContent: {
        color: '#FFFFFF',
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
        color: '#FFFFFF',
        marginLeft: 5,
    },
});

export default HomeScreen;