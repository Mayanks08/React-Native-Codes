export interface Thread {
    id: string;
    author: User;
    content: string;
    image?: string;
    replies?: Thread[];
    repliesCount?: number;
    likesCount?: number;
    media?: boolean;
    mentionUser?: User;
    createdAt: String;
    
}
export interface User {
    id: string;
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
    photo?: string;
    bio?: string;
    link?: string;
    followers:User[];
    following:User[];
}

export interface ThreadList {
    threads: Thread[];
    total: number;
    page: number;
    pageSize: number;
}

export interface Reply {
    id: string;
    author: User;
    content: string;
    likes: number;
    createdAt: String;
}