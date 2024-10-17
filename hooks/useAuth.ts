import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (token) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Erro ao verificar autenticação:', error);
                Alert.alert('Erro', 'Houve um erro ao verificar a autenticação.');
            } finally {
                setLoading(false);
            }
        };

        checkAuthentication();
    }, []);

    return { loading, isAuthenticated };
};

export default useAuth;