import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import authService from '@/app/services/authService';
import {router} from "expo-router";

const CreateStudentScreen: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role] = useState('student');

    const handleCreateStudent = async () => {
        if (!username || !email || !password) {
            Alert.alert('Erro', 'Nome de usuário, email e senha são obrigatórios.');
            return;
        }

        const newStudent = {
            username,
            email,
            password,
            role,
        };

        try {
            await authService.register(newStudent);
            Alert.alert('Sucesso', 'Aluno criado com sucesso.');
            router.push('/students/ListStudentsScreen');
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Erro', error.message || 'Não foi possível criar o aluno.');
            } else {
                Alert.alert('Erro', 'Erro desconhecido ao criar o aluno.');
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
            <Button title="Criar Aluno" onPress={handleCreateStudent} />
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

export default CreateStudentScreen;