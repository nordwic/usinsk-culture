import { useEffect, useState } from 'react';
import { mediaApi, type MediaDto } from '../api/mediaApi';

export function useMediaPreview(pageSize = 8) {
	const [data, setData] = useState<MediaDto[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		mediaApi
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
