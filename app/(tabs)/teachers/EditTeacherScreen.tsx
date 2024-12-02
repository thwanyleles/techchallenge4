import React, { useEffect, useState } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import userService from '@/app/services/userService';
import { User } from '@/interfaces/User';
import { router, useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '@/components/HeaderFooter/Footer';

const EditTeacherScreen: React.FC = () => {
    const { teacherId } = useLocalSearchParams();
    const [teacher, setTeacher] = useState<User | null>(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [userRole, setUserRole] = useState<string | null>('teacher');

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
                <TouchableOpacity style={styles.updateButton} onPress={handleUpdateTeacher}>
                    <Icon name="save" size={16} color="#FFFFFF" />
                    <Text style={styles.updateButtonText}>Atualizar Professor</Text>
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

export default EditTeacherScreen;