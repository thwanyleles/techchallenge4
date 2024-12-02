import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header: React.FC = () => (
    <View style={styles.header}>
        <Text style={styles.logo}>Bloguinho</Text>
    </View>
);

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#000000',
        padding: 16,
        alignItems: 'center',
    },
    logo: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Header;