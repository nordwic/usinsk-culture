import { useEffect, useState } from 'react';
import { newsApi, type NewsDto } from '../api/newsApi';

export function useNewsPreview(pageSize = 4) {
	const [data, setData] = useState<NewsDto[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		newsApi
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
