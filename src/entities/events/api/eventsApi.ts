import { httpClient, type PagedResponse } from '../../../shared/api/client';

export interface EventDto {
	id: number;
	title: string;
	image_url: string | null;
	description: string;
	date: string;
	type: string;
	location: string;
	published: boolean;
}

export const eventsApi = {
	getPreview: (pageSize = 5) =>
		httpClient.get<PagedResponse<EventDto>>('/events/', {
			page_size: String(pageSize),
			ordering: 'date',
		}),
};
