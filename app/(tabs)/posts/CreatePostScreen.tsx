import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import postService from '@/app/services/postService';
import { router } from "expo-router";

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
                style={styles.input}
            />
            <TextInput
                placeholder="Autor"
                value={author}
                onChangeText={setAuthor}
                style={styles.input}
            />
            <Button title="Criar Post" onPress={handleCreatePost} />
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

export default CreatePostScreen;