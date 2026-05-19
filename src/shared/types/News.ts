export interface NewsItem {
	id: number;
	title: string;
	content: string;
	summary: string;
	category: string;
	image?: string;
	date: string;
	author: string;
	published: boolean;
}
