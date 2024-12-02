import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { IComment } from '@/interfaces/Comment';
import commentService from '@/app/services/commentService';
import Icon from 'react-native-vector-icons/FontAwesome';

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
                <Text style={styles.replyText}>{reply.content}</Text>
            </View>
        ));
    };

    const renderCommentItem = (item: IComment) => (
        <View style={styles.commentItem} key={item.id}>
            <Text style={styles.commentAuthor}>{item.author}</Text>
            <Text style={styles.commentText}>{item.content}</Text>
            <View style={styles.commentFooter}>
                <TextInput
                    placeholder="Responder..."
                    value={replyText[item.id] || ''}
                    onChangeText={(text) => setReplyText(prev => ({ ...prev, [item.id]: text }))}
                    style={styles.replyInput}
                />
                <TouchableOpacity
                    onPress={() => handleReplyToComment(item.id)}
                    style={styles.replyButton}
                >
                    <Icon name="reply" size={16} color="#FFFFFF" />
                </TouchableOpacity>
                {userRole === 'teacher' && (
                    <TouchableOpacity
                        onPress={() => handleDeleteComment(item.id)}
                        style={styles.deleteButton}
                    >
                        <Icon name="trash" size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                )}
            </View>
            {renderReplies(item.replies || [])}
        </View>
    );

    return (
        <View style={styles.commentCard}>
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
            <TouchableOpacity onPress={handleAddComment} style={styles.commentButton}>
                <Text style={styles.commentButtonText}>Comentar</Text>
            </TouchableOpacity>

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
    commentCard: {
        marginTop: 20,
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.5,
        marginHorizontal: 20,
    },
    input: {
        height: 40,
        borderColor: '#FF6B6B',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 16,
        backgroundColor: '#F5F5F5',
        color: '#1A1A1A',
    },
    commentItem: {
        marginVertical: 8,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
    },
    commentAuthor: {
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 4,
    },
    commentText: {
        color: '#1A1A1A',
    },
    commentFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    deleteButton: {
        backgroundColor: '#FF6B6B',
        padding: 8,
        borderRadius: 5,
        marginLeft: 8,
    },
    replyInput: {
        flex: 1,
        height: 40,
        borderColor: '#FF6B6B',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#F5F5F5',
        color: '#1A1A1A',
        marginRight: 8,
    },
    replyButton: {
        backgroundColor: '#FF6B6B',
        padding: 8,
        borderRadius: 5,
        marginLeft: 8,
    },
    commentButton: {
        backgroundColor: '#FF6B6B',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    commentButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    commentListContainer: {
        paddingBottom: 16,
    },
    replyItem: {
        marginTop: 8,
        paddingLeft: 16,
        borderColor: '#FF6B6B',
        borderLeftWidth: 1,
        backgroundColor: '#EAEAEA',
        paddingVertical: 4,
    },
    replyText: {
        color: '#1A1A1A',
    },
});

export default CommentSection;