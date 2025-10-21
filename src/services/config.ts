// Common API configuration
export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Helper to build URLs with query params
export function buildUrl(path: string, params?: Record<string, string | number | boolean | undefined | null>) {
	const url = new URL(path, API_BASE);
	if (params) {
		Object.entries(params).forEach(([k, v]) => {
			if (v !== undefined && v !== null && v !== '') {
				url.searchParams.set(k, String(v));
			}
		});
	}
	return url.toString();
}

