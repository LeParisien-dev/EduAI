// Base API URL: use env variable in prod, fallback to localhost in dev
export const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function api(path: string, options: RequestInit = {}) {
    const safePath = path.startsWith("/") ? path : `/${path}`;

    const res = await fetch(`${API_URL}${safePath}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `API error ${res.status}`);
    }

    return res.json();
}
