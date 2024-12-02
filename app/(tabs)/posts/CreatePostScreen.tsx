import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import postService from '@/app/services/postService';
import { router } from "expo-router";
import Footer from '@/components/HeaderFooter/Footer';
import Icon from 'react-native-vector-icons/FontAwesome';

const CreatePostScreen: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');

    const handleCreatePost = async () => {
        if (!title || !content || !author) {
            Alert.alert('Erro', 'Título, conteúdo e autor são obrigatórios.');
            return;
        }

        try {
            await postService.createPost({ title, content, author });
            Alert.alert('Sucesso!', 'Postagem criada com sucesso.', [
                {
                    text: 'OK',
                    onPress: () => {
                        router.push('/home/HomeScreen');
                    }
                }
            ]);
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Erro', error.message || 'Erro ao criar postagem.');
            } else {
                Alert.alert('Erro', 'Erro desconhecido ao criar postagem.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.createPostButton} onPress={handleCreatePost}>
                <Icon name="floppy-o" size={16} color="#FFFFFF" />
                <Text style={styles.createPostButtonText}>Gravar</Text>
            </TouchableOpacity>

            <View style={styles.card}>
                <TextInput
                    placeholder="Título"
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Conteúdo"
                    value={content}
                    onChangeText={setContent}
                    multiline
                    style={[styles.input, { height: 100 }]}
                />
                <TextInput
                    placeholder="Autor"
                    value={author}
                    onChangeText={setAuthor}
                    style={styles.input}
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
    createPostButton: {
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
    createPostButtonText: {
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

export default CreatePostScreen;