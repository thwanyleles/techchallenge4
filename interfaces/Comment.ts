export interface IComment {
    id: string;
    post_id: string;
    author: string;
    content: string;
    created_at: string;
    parent_id?: string;
    replies?: IComment[];
}
