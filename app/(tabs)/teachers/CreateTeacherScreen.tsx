import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import authService from '@/app/services/authService';
import {router} from "expo-router";

const CreateTeacherScreen: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role] = useState('teacher');

    const handleCreateTeacher = async () => {
        if (!username || !email || !password) {
            Alert.alert('Erro', 'Nome de usuário, email e senha são obrigatórios.');
            return;
        }

        const newTeacher = {
            username,
            email,
            password,
            role,
        };

        try {
            await authService.register(newTeacher);
            Alert.alert('Sucesso', 'Professor criado com sucesso.', [
                {
                    text: 'OK',
                    onPress: () => {
                        router.push('/teachers/ListTeachersScreen');
                    }
                }
            ]);
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Erro', error.message || 'Não foi possível criar o professor.');
            } else {
                Alert.alert('Erro', 'Erro desconhecido ao criar o professor.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nome de Usuário"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Criar Professor" onPress={handleCreateTeacher} />
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

export default CreateTeacherScreen;