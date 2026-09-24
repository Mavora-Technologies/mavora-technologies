export interface Insight {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  coverImage?: string | null;
  published: boolean;
  featured: boolean;
  readTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  client?: string | null;
  category: string;
  coverImage?: string | null;
  metrics?: string | null;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// --- INSIGHTS API ---

// Fetch all published insights from your database
export async function getInsights(): Promise<Insight[]> {
  try {
    const res = await fetch(`${API_BASE}/api/insights`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return [];
    }

    const json: ApiResponse<Insight[]> = await res.json();
    return json.data || [];
  } catch (error) {
    console.error('Error in getInsights:', error);
    return [];
  }
}

// Fetch a single published insight by slug from your database
export async function getInsightBySlug(slug: string): Promise<Insight | null> {
  try {
    const res = await fetch(`${API_BASE}/api/insights/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return null;
    }

    const json: ApiResponse<Insight> = await res.json();
    return json.data || null;
  } catch (error) {
    console.error(`Error in getInsightBySlug [${slug}]:`, error);
    return null;
  }
}

// --- PROJECTS API ---

// Fetch all projects from your database
export async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_BASE}/api/projects`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return [];
    }

    const json: ApiResponse<Project[]> = await res.json();
    return json.data || [];
  } catch (error) {
    console.error('Error in getProjects:', error);
    return [];
  }
}

// Fetch a single project by slug from your database
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(`${API_BASE}/api/projects/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return null;
    }

    const json: ApiResponse<Project> = await res.json();
    return json.data || null;
  } catch (error) {
    console.error(`Error in getProjectBySlug [${slug}]:`, error);
    return null;
  }
}