const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const API_BASE_URL = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl}/api`;

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]> | any;
}

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    
    // Automatically stringify object bodies (ignoring FormData for file uploads)
    let body = options?.body;
    if (body && typeof body === 'object' && !(body instanceof FormData)) {
      body = JSON.stringify(body) as any;
    }

    const response = await fetch(`${API_BASE_URL}${cleanEndpoint}`, {
      ...options,
      body,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    // Safely parse JSON to prevent crashes on HTML error pages (e.g., 502 Bad Gateway)
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } 
    
    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}: ${response.statusText}`);
    }

    return { success: true } as ApiResponse<T>;

  } catch (error: any) {
    console.error(`[fetchApi Error] ${endpoint}:`, error);
    return {
      success: false,
      message: error.message || 'A network error occurred while communicating with the server.',
    };
  }
}