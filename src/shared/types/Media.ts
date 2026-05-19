export interface MediaItem {
	id: number;
	title: string;
	type: 'photo' | 'video';
	url: string;
	category: string;
	description?: string;
	date: string;
	uploadedBy: string;
}
