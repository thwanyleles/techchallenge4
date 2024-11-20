import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, Alert, StyleSheet } from 'react-native';
import userService from '@/app/services/userService';
import { User } from '@/interfaces/User';
import { useRouter } from 'expo-router';

const ListStudentsScreen: React.FC = () => {
    const [students, setStudents] = useState<User[]>([]);
    const router = useRouter();

    const fetchStudents = async () => {
        try {
            const fetchedStudents = await userService.listAllUsers();
            setStudents(fetchedStudents.filter(user => user.role === 'student'));
        } catch (error) {
            console.error('Erro ao buscar alunos:', error);
            Alert.alert('Erro', 'Não foi possível carregar a lista de alunos.');
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleEdit = (studentId: string) => {
        router.push(`/students/EditStudentScreen?studentId=${studentId}`);
    };

    const handleDelete = async (studentId: string) => {
        try {
            await userService.deleteUser(studentId);
            Alert.alert('Sucesso', 'Aluno excluído com sucesso.');
            fetchStudents();
        } catch (error) {
            console.error('Erro ao excluir aluno:', error);
            Alert.alert('Erro', 'Não foi possível excluir o aluno.');
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Adicionar Aluno" onPress={() => router.push('/students/CreateStudentScreen')} />
            <FlatList
                data={students}
                renderItem={({ item }) => (
                    <View style={styles.studentItem}>
                        <Text style={styles.studentName}>{item.username}</Text>
                        <View style={styles.buttonContainer}>
                            <Button title="Editar" onPress={() => handleEdit(item.id)} />
                            <Button title="Excluir" onPress={() => handleDelete(item.id)} />
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    studentItem: {
        marginBottom: 15,
        padding: 15,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
    },
    studentName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});

export default ListStudentsScreen;