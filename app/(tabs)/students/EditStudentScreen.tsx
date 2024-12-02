import React, { useEffect, useState } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import userService from '@/app/services/userService';
import { User } from '@/interfaces/User';
import { router, useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '@/components/HeaderFooter/Footer';

const EditStudentScreen: React.FC = () => {
    const { studentId } = useLocalSearchParams();
    const [student, setStudent] = useState<User | null>(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [userRole, setUserRole] = useState<string | null>('teacher');

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
            fetchStudent(studentId as string);
        }
    }, [studentId]);

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
                <TouchableOpacity style={styles.updateButton} onPress={handleUpdateStudent}>
                    <Icon name="save" size={16} color="#FFFFFF" />
                    <Text style={styles.updateButtonText}>Atualizar Aluno</Text>
                </TouchableOpacity>
            </View>
            <Footer
                userRole={userRole}
                onHome={() => router.push('/')}
                onLogout={() => router.push('/auth/LoginScreen')}
                onNavigateTo={(screen: string) => router.push(screen as any)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        margin: 0,
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 20,
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
        height: 40,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        color: '#000000',
    },
    updateButton: {
        backgroundColor: '#FF6B6B',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    updateButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginLeft: 5,
    },
});

export default EditStudentScreen;