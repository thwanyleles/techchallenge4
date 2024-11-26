import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, Alert, StyleSheet } from 'react-native';
import { IComment } from '@/interfaces/Comment';
import commentService from '@/app/services/commentService';

interface CommentSectionProps {
    comments: IComment[];
    postId: string;
    userRole: string | null;
    onCommentAdded: (newComment: IComment) => void;
    onCommentDeleted: (commentId: string) => void;
    onReplyAdded: (newReply: IComment) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
                                                           comments,
                                                           postId,
                                                           userRole,
                                                           onCommentAdded,
                                                           onCommentDeleted,
                                                           onReplyAdded,
                                                       }) => {
    const [commentText, setCommentText] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

    const handleAddComment = async () => {
        try {
            const newComment = await commentService.createComment(postId, authorName, commentText);
            onCommentAdded(newComment);
            setCommentText('');
            setAuthorName('');
        } catch (error) {
            console.error('Erro ao adicionar comentário:', error);
            Alert.alert('Erro', 'Não foi possível adicionar o comentário.');
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        try {
            await commentService.deleteComment(commentId);
            onCommentDeleted(commentId);
        } catch (error) {
            console.error('Erro ao excluir comentário:', error);
            Alert.alert('Erro', 'Não foi possível excluir o comentário.');
        }
    };

    const handleReplyToComment = async (commentId: string) => {
        try {
            const newReply = await commentService.replyToComment(commentId, postId, authorName, replyText[commentId]);
            onReplyAdded(newReply);
            setReplyText(prev => ({ ...prev, [commentId]: '' }));
        } catch (error) {
            console.error('Erro ao responder comentário:', error);
            Alert.alert('Erro', 'Não foi possível responder ao comentário.');
        }
    };

    const renderReplies = (replies: IComment[]) => {
        if (!replies || replies.length === 0) return null;

        return replies.map((reply) => (
            <View key={reply.id} style={styles.replyItem}>
                <Text>{reply.content}</Text>
            </View>
        ));
    };

    const renderCommentItem = (item: IComment) => (
        <View style={styles.commentItem} key={item.id}>
            <Text>{item.content}</Text>
            {userRole === 'teacher' && (
                <>
                    <Button title="Excluir" onPress={() => handleDeleteComment(item.id)} color="#FF6B6B" />
                    <TextInput
                        placeholder="Responder..."
                        value={replyText[item.id] || ''}
                        onChangeText={(text) => setReplyText(prev => ({ ...prev, [item.id]: text }))}
                        style={styles.input}
                    />
                    <Button title="Responder" onPress={() => handleReplyToComment(item.id)} color="#FF6B6B" />
                </>
            )}
            {renderReplies(item.replies || [])}
        </View>
    );

    return (
        <View>
            <TextInput
                placeholder="Seu nome"
                value={authorName}
                onChangeText={setAuthorName}
                style={styles.input}
            />
            <TextInput
                placeholder="Deixe seu comentário..."
                value={commentText}
                onChangeText={setCommentText}
                style={styles.input}
            />
            <Button title="Comentar" onPress={handleAddComment} color="#FF6B6B" />

            <FlatList
                data={comments}
                renderItem={({ item }) => renderCommentItem(item)}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.commentListContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: '#FF6B6B',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 16,
        backgroundColor: '#2B2B2B',
        color: '#FFFFFF',
    },
    commentItem: {
        marginVertical: 8,
        padding: 10,
        borderColor: '#FF6B6B',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#2B2B2B',
    },
    commentListContainer: {
        paddingBottom: 16,
    },
    replyItem: {
        marginTop: 8,
        paddingLeft: 16,
        borderColor: '#FF6B6B',
        borderLeftWidth: 1,
        backgroundColor: '#333333',
        paddingVertical: 4,
    },
});

export default CommentSection;