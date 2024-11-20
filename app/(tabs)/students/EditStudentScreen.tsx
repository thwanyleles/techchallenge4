import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import userService from '@/app/services/userService';
import { User } from '@/interfaces/User';
import {router, useLocalSearchParams} from 'expo-router';

const EditStudentScreen: React.FC = () => {
    const { studentId } = useLocalSearchParams();
    const [student, setStudent] = useState<User | null>(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const fetchStudent = async (id: string) => {
        try {
            const fetchedStudent = await userService.getUserById(id);
            if (fetchedStudent) {
                setStudent(fetchedStudent);
                setUsername(fetchedStudent.username);
                setEmail(fetchedStudent.email);
            } else {
                Alert.alert('Erro', 'Aluno não encontrado.');
            }
        } catch (error) {
            console.error('Erro ao buscar aluno:', error);
            Alert.alert('Erro', 'Não foi possível carregar os dados do aluno.');
        }
    };

    const handleUpdateStudent = async () => {
        if (!student) return;

        const updatedStudent = {
            ...student,
            username,
            email,
        };

        try {
            await userService.updateUser(student.id, updatedStudent);
            Alert.alert('Sucesso', 'Aluno atualizado com sucesso.');
            router.push('/students/ListStudentsScreen');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível atualizar o aluno.');
        }
    };

    useEffect(() => {
        if (studentId) {
            fetchStudent(studentId as string); // Chamada para buscar o aluno
        }
    }, [studentId]);

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
            <Button title="Atualizar Aluno" onPress={handleUpdateStudent} />
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

export default EditStudentScreen;