import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface SearchBarProps {
    searchTerm: string;
    onSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
    return (
        <TextInput
            style={styles.searchInput}
            placeholder="Buscar posts..."
            value={searchTerm}
            onChangeText={onSearch}
            placeholderTextColor="#A9A9A9"
        />
    );
};

const styles = StyleSheet.create({
    searchInput: {
        height: 40,
        borderColor: '#FF6B6B',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 16,
        backgroundColor: '#FFFFFF',
        color: '#000000',
    },
});

export default SearchBar;