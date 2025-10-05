export interface IBlog {
    id?: number;
    title: string;
    content: string;
    thumbnail?: string;
    category?: string;
    tags?: string[];
    published?: boolean;
    views?: number;
}