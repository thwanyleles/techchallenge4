import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import authService from '@/app/services/authService';
import { router } from "expo-router";
import Icon from 'react-native-vector-icons/FontAwesome';

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
            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome de Usuário"
                    value={username}
                    onChangeText={setUsername}
                    placeholderTextColor="#A9A9A9"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    placeholderTextColor="#A9A9A9"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#A9A9A9"
                />
                <TouchableOpacity style={styles.createButton} onPress={handleCreateStudent}>
                    <Icon name="user-plus" size={16} color="#FFFFFF" />
                    <Text style={styles.createButtonText}>Criar Aluno</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        padding: 20,
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 20,
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
        height: 40,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        color: '#000000',
    },
    createButton: {
        backgroundColor: '#FF6B6B',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    createButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginLeft: 5,
    },
});

export default CreateStudentScreen;