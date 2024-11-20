import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import userService from '@/app/services/userService';
import { User } from '@/interfaces/User';
import {router, useLocalSearchParams} from 'expo-router';

const EditTeacherScreen: React.FC = () => {
    const { teacherId } = useLocalSearchParams();
    const [teacher, setTeacher] = useState<User | null>(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const fetchTeacher = async (id: string) => {
        try {
            const fetchedTeacher = await userService.getUserById(id);
            if (fetchedTeacher) {
                setTeacher(fetchedTeacher);
                setUsername(fetchedTeacher.username);
                setEmail(fetchedTeacher.email);
            } else {
                Alert.alert('Erro', 'Professor não encontrado.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os dados do professor.');
        }
    };

    const handleUpdateTeacher = async () => {
        if (!teacher) return;

        const updatedTeacher = {
            ...teacher,
            username,
            email,
        };

        try {
            await userService.updateUser(teacher.id, updatedTeacher);
            Alert.alert('Sucesso', 'Professor atualizado com sucesso.');
            router.push('/teachers/ListTeachersScreen');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível atualizar o professor.');
        }
    };

    useEffect(() => {
        if (teacherId) {
            fetchTeacher(teacherId as string);
        }
    }, [teacherId]);

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
            <Button title="Atualizar Professor" onPress={handleUpdateTeacher} />
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

export default EditTeacherScreen;