import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, Alert, StyleSheet } from 'react-native';
import userService from '@/app/services/userService';
import { User } from '@/interfaces/User';
import { useRouter } from 'expo-router';

const ListTeachersScreen: React.FC = () => {
    const [teachers, setTeachers] = useState<User[]>([]);
    const router = useRouter();

    const fetchTeachers = async () => {
        try {
            const fetchedTeachers = await userService.listAllUsers();
            setTeachers(fetchedTeachers.filter(user => user.role === 'teacher'));
        } catch (error) {
            console.error('Erro ao buscar professores:', error);
        }
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    const handleEdit = (teacherId: string) => {
        router.push(`/teachers/EditTeacherScreen?teacherId=${teacherId}`);
    };

    const handleDelete = async (teacherId: string) => {
        try {
            await userService.deleteUser(teacherId);
            Alert.alert('Sucesso', 'Professor excluído com sucesso.');
            fetchTeachers();
        } catch (error) {
            console.error('Erro ao excluir professor:', error);
            Alert.alert('Erro', 'Não foi possível excluir o professor.');
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Adicionar Professor" onPress={() => router.push('/teachers/CreateTeacherScreen')} />
            <FlatList
                data={teachers}
                renderItem={({ item }) => (
                    <View style={styles.teacherItem}>
                        <Text style={styles.teacherName}>{item.username}</Text>
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
    teacherItem: {
        marginBottom: 15,
        padding: 15,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
    },
    teacherName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});

export default ListTeachersScreen;