import { useEffect, useState } from 'react';
import { heritageApi, type HeritageDto } from '../api/heritageApi';

export function useHeritagePreview(pageSize = 4) {
	const [data, setData] = useState<HeritageDto[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		heritageApi
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
