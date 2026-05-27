import { httpClient, type PagedResponse } from '../../../shared/api/client';

export interface NewsDto {
	id: number;
	title: string;
	summary: string;
	category: string;
	image_url: string | null;
	date: string;
	author: string;
	published: boolean;
}

export const newsApi = {
	getPreview: (pageSize = 4) =>
		httpClient.get<PagedResponse<NewsDto>>('/news/', {
			page_size: String(pageSize),
		}),
};
