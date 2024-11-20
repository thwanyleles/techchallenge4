import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IComment } from '@/interfaces/Comment';

const CommentItem: React.FC<{ comment: IComment }> = ({ comment }) => {
    return (
        <View style={styles.commentItem}>
            <Text style={styles.commentAuthor}>{comment.author}</Text>
            <Text style={styles.commentContent}>{comment.content}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    commentItem: {
        marginBottom: 12,
        padding: 12,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    commentAuthor: {
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 4,
    },
    commentContent: {
        color: '#555555',
    },
});

export default CommentItem;