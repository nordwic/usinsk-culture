export interface ForumThread {
	id: number;
	categoryId: string;
	title: string;
	authorName: string;
	authorId: number | null;
	createdAt: string;
	views: number;
	pinned?: boolean;
}

export interface ForumPost {
	id: number;
	threadId: number;
	content: string;
	authorName: string;
	authorId: number | null;
	createdAt: string;
}
