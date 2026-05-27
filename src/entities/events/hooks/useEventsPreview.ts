import { useEffect, useState } from 'react';
import { eventsApi, type EventDto } from '../api/eventsApi';

export function useEventsPreview(pageSize = 5) {
	const [data, setData] = useState<EventDto[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		eventsApi
			.getPreview(pageSize)
			.then((res) => setData(res.results))
			.catch((err: unknown) =>
				setError(
					err instanceof Error ? err.message : 'Ошибка загрузки',
				),
			)
			.finally(() => setIsLoading(false));
	}, [pageSize]);

	return { data, isLoading, error };
}
