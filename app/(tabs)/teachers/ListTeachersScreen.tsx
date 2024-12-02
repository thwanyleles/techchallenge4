import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import userService from '@/app/services/userService';
import { User } from '@/interfaces/User';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '@/components/HeaderFooter/Footer';

const ListTeachersScreen: React.FC = () => {
    const [teachers, setTeachers] = useState<User[]>([]);
    const router = useRouter();
    const [userRole, setUserRole] = useState<string | null>('teacher');

    const fetchTeachers = async () => {
        try {
            const fetchedTeachers = await userService.listAllUsers();
            setTeachers(fetchedTeachers.filter(user => user.role === 'teacher'));
        } catch (error) {
            console.error('Erro ao buscar professores:', error);
            Alert.alert('Erro', 'Não foi possível carregar a lista de professores.');
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
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.addButton} onPress={() => router.push('/teachers/CreateTeacherScreen')}>
                    <Icon name="user-plus" size={16} color="#FFFFFF" />
                    <Text style={styles.addButtonText}>Adicionar Professor</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={teachers}
                renderItem={({ item }) => (
                    <View style={styles.teacherItem}>
                        <Text style={styles.teacherName}>{item.username}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => handleEdit(item.id)} style={styles.editButton}>
                                <Icon name="edit" size={16} color="#FF6B6B" />
                                <Text style={styles.editText}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                                <Icon name="trash" size={16} color="#FF6B6B" />
                                <Text style={styles.deleteText}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
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
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    addButton: {
        backgroundColor: '#FF6B6B',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    addButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    listContainer: {
        paddingBottom: 20,
    },
    teacherItem: {
        backgroundColor: '#FFFFFF',
        marginBottom: 15,
        marginHorizontal: 20,
        padding: 15,
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.5,
    },
    teacherName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    editText: {
        color: '#FF6B6B',
        marginLeft: 5,
    },
    deleteButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    deleteText: {
        color: '#FF6B6B',
        marginLeft: 5,
    },
});

export default ListTeachersScreen;