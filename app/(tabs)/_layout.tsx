import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Login' }} />
            <Stack.Screen name="explore" options={{ title: 'Posts' }} />
        </Stack>
    );
}