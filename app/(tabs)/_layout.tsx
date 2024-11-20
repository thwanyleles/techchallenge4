import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="auth/LoginScreen" options={{ title: 'Login' }} />
            <Stack.Screen name="auth/RegisterScreen" options={{ title: 'Registrar' }} />
            <Stack.Screen name="admin/AdminScreen" options={{ title: 'Admin' }} />
            <Stack.Screen name="home/HomeScreen" options={{ title: 'Home' }} />
            <Stack.Screen name="posts/CreatePostScreen" options={{ title: 'Criar Post' }} />
            <Stack.Screen name="posts/EditPostScreen" options={{ title: 'Editar Post' }} />
            <Stack.Screen name="posts/PostDetailScreen" options={{ title: 'Detalhes do Post' }} />
            <Stack.Screen name="students/CreateStudentScreen" options={{ title: 'Criar Aluno' }} />
            <Stack.Screen name="students/EditStudentScreen" options={{ title: 'Editar Aluno' }} />
            <Stack.Screen name="students/ListStudentsScreen" options={{ title: 'Lista de Alunos' }} />
            <Stack.Screen name="teachers/CreateTeacherScreen" options={{ title: 'Criar Professor' }} />
            <Stack.Screen name="teachers/EditTeacherScreen" options={{ title: 'Editar Professor' }} />
            <Stack.Screen name="teachers/ListTeachersScreen" options={{ title: 'Lista de Professores' }} />
            <Stack.Screen name="explore" options={{ title: 'Explorar' }} />
            <Stack.Screen name="index" options={{ title: 'Tela Inicial' }} />
        </Stack>
    );
}