import { httpClient, type PagedResponse } from '../../../shared/api/client';

export interface MediaDto {
	id: number;
	title: string;
	type: 'photo' | 'video';
	file_url: string | null;
	url: string | null;
	category: string;
	description: string | null;
	date: string;
	uploaded_by: string;
}

/** Возвращает отображаемый URL: сначала file_url (бэкенд), затем url (статика) */
export function getMediaDisplayUrl(item: MediaDto): string {
	return item.file_url ?? item.url ?? '';
}

export const mediaApi = {
	getPreview: (pageSize = 8) =>
		httpClient.get<PagedResponse<MediaDto>>('/media/', {
			page_size: String(pageSize),
		}),
};
