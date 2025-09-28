export const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function api(path: string, options: RequestInit = {}) {
    const res = await fetch(`${API_URL}${path}`, {
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
