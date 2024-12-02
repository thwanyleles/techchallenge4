import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface SearchBarProps {
    searchTerm: string;
    onSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
    return (
        <View style={styles.container}>
            <Icon name="search" size={16} color="#A9A9A9" style={styles.icon} />
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar..."
                value={searchTerm}
                onChangeText={onSearch}
                placeholderTextColor="#A9A9A9"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 6,
        borderRadius: 12,
        marginBottom: 16,
    },
    icon: {
        marginRight: 6,
    },
    searchInput: {
        height: 30,
        flex: 1,
        color: '#000000',
        fontSize: 12,
    },
});

export default SearchBar;