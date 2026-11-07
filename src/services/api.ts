// API Client Configuration for TribalSQL
// Supports easy switching between Mock Data Mode and FastAPI Backend Mode.

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const IS_MOCK_MODE = import.meta.env.VITE_USE_MOCK_API !== 'false'; // Default to true until FastAPI is running

export interface ApiResponse<T> {
  data: T;
  source: 'mock' | 'fastapi';
  status: number;
  message?: string;
}

/**
 * Standard HTTP fetcher designed to route to FastAPI or fallback to local mock generators.
 */
export async function apiFetch<T>(
  endpoint: string, 
  options: RequestInit = {}, 
  mockFallback: () => Promise<T>
): Promise<ApiResponse<T>> {
  if (IS_MOCK_MODE) {
    // Artificial latency (150ms - 400ms) for realistic UX and loading states
    await new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 250) + 150));
    const mockData = await mockFallback();
    return {
      data: mockData,
      source: 'mock',
      status: 200,
      message: 'Demo simulated response (mock mode active)',
    };
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!res.ok) {
      throw new Error(`API error ${res.status}: ${res.statusText}`);
    }

    const json = await res.json();
    return {
      data: json,
      source: 'fastapi',
      status: res.status,
    };
  } catch (err) {
    console.warn(`[TribalSQL API] Request to ${endpoint} failed, falling back to mock:`, err);
    const mockData = await mockFallback();
    return {
      data: mockData,
      source: 'mock',
      status: 200,
      message: 'Fallback to mock simulation due to backend connection failure',
    };
  }
}

