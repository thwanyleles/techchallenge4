import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LoginRequest } from '@/interfaces/Auth';
import authService from "@/app/services/authService";
import { router } from "expo-router";

const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const loginData: LoginRequest = { email, password };
        try {
            const response = await authService.login(loginData);
            Alert.alert('Login bem-sucedido!', 'Bem-vindo!');
            router.push('/explore');
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Erro!', error.message || 'Erro ao realizar login.');
            } else {
                Alert.alert('Erro!', 'Erro inesperado ao realizar login.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholder="Email"
                placeholderTextColor="#A9A9A9"
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Senha"
                placeholderTextColor="#A9A9A9"
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.secondaryButton]}
                    onPress={() => router.push('/auth/RegisterScreen')}
                >
                    <Text style={styles.buttonText}>Registrar</Text>
                </TouchableOpacity>
            </View>
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
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 16,
        color: '#FFFFFF',
        backgroundColor: '#2B2B2B',
    },
    buttonContainer: {
        width: '100%',
        marginTop: 10,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#FF6B6B',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    secondaryButton: {
        backgroundColor: '#B0B0B0',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LoginScreen;