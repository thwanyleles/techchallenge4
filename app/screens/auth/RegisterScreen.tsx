import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { RegisterRequest } from '@/interfaces/Auth';
import authService from "@/app/services/authService";
import { router } from "expo-router";

const RegisterScreen: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleRegister = async () => {
        const registerData: RegisterRequest = { username, email, password, role };
        try {
            const response = await authService.register(registerData);
            Alert.alert('Sucesso!', 'Usuário registrado com sucesso.');
            router.push('/screens/auth/LoginScreen');
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Erro!', error.message || 'Erro ao registrar usuário.');
            } else {
                Alert.alert('Erro!', 'Erro inesperado ao registrar usuário.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrar</Text>
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

            <Text style={styles.roleTitle}>Você é:</Text>
            <View style={styles.radioGroup}>
                <TouchableOpacity
                    style={styles.radioContainer}
                    onPress={() => setRole('student')}
                >
                    <View style={[styles.radioBox, role === 'student' && styles.radioChecked]} />
                    <Text style={styles.radioLabel}>Estudante</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.radioContainer}
                    onPress={() => setRole('teacher')}
                >
                    <View style={[styles.radioBox, role === 'teacher' && styles.radioChecked]} />
                    <Text style={styles.radioLabel}>Professor</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
        padding: 16,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        width: '100%',
        borderColor: '#FF6B6B',
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 16,
        color: '#FFFFFF',
        backgroundColor: '#2B2B2B',
        fontSize: 16,
    },
    roleTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        marginVertical: 16,
        alignSelf: 'flex-start',
    },
    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 20,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    radioBox: {
        width: 24,
        height: 24,
        borderColor: '#FF6B6B',
        borderWidth: 2,
        borderRadius: 4, // Para um visual mais quadrado
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioChecked: {
        backgroundColor: '#FF6B6B', // Cor quando selecionado
    },
    radioLabel: {
        color: '#FFFFFF',
        marginLeft: 8,
        fontSize: 16,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#FF6B6B',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        elevation: 2,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default RegisterScreen;