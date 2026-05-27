/** Base URL: in dev proxied to localhost:8000 via vite; in prod set VITE_API_URL */
const BASE =
	(import.meta as ImportMeta & { env: Record<string, string> }).env
		.VITE_API_URL ?? '/api/v1';

export interface PagedResponse<T> {
	count: number;
	next: string | null;
	previous: string | null;
	results: T[];
}

async function get<T>(
	path: string,
	params?: Record<string, string>,
): Promise<T> {
	const qs = params ? '?' + new URLSearchParams(params).toString() : '';
	const res = await fetch(`${BASE}${path}${qs}`, {
		headers: { Accept: 'application/json' },
	});
	if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
	return res.json() as Promise<T>;
}

export const httpClient = { get };
