import { httpClient, type PagedResponse } from '../../../shared/api/client';

export interface HeritageDto {
	id: number;
	title: string;
	type: string;
	village: string;
	description: string;
	image_url: string | null;
}

export const heritageApi = {
	getPreview: (pageSize = 4) =>
		httpClient.get<PagedResponse<HeritageDto>>('/heritage/', {
			page_size: String(pageSize),
		}),
};
