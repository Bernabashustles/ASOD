import axios, { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'sonner';

export interface StoreNameSuggestionRequest {
  niche: string;
  audiencePsychographics: string;
  brandTone: string;
  languages: string[];
}

export interface StoreNameSuggestionVariant {
  lang: string;
  value: string;
}

export interface StoreNameSuggestionItem {
  name: string;
  rationale: string;
  culturalSensitivityScore?: number;
  variants?: StoreNameSuggestionVariant[];
  sentiment?: {
    label: string;
    score: number;
  };
  trademarkStatus?: {
    status: 'unknown' | 'clear' | 'potential-conflict' | string;
    notes?: string;
  };
}

export interface StoreNameSuggestionResponse {
  success: boolean;
  data: {
    suggestions: StoreNameSuggestionItem[];
  };
}

// Subdomain suggestions
export interface SubdomainSuggestionRequest {
  concept: string;
  industry: string;
  geoTarget: string;
  keywords: string[];
}

export interface SubdomainSuggestionItem {
  subdomain: string;
  rationale: string;
  brandSafety: boolean;
  popularityScore: number;
  fullDomain: string;
  platformAvailable: boolean;
}

export interface SubdomainSuggestionResponse {
  success: boolean;
  data: {
    domain: string;
    suggestions: SubdomainSuggestionItem[];
  };
}

const aiAxios: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3011',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer oxa-dev-access',
  },
  withCredentials: false,
});

aiAxios.interceptors.request.use((config) => {
  config.headers['X-Request-Timestamp'] = new Date().toISOString();
  return config;
});

aiAxios.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    const message = (error.response as any)?.data?.message || error.message || 'AI service error';
    toast.error(message);
    return Promise.reject(error);
  }
);

export const aiService = {
  async getStoreNameSuggestions(payload: StoreNameSuggestionRequest): Promise<StoreNameSuggestionItem[]> {
    const res = await aiAxios.post<StoreNameSuggestionResponse>('/api/v1/store/name-suggestions', payload);
    if (res.data?.success && Array.isArray(res.data.data?.suggestions)) {
      return res.data.data.suggestions;
    }
    return [];
  },

  async getSubdomainSuggestions(payload: SubdomainSuggestionRequest): Promise<{ domain: string; suggestions: SubdomainSuggestionItem[] }> {
    const res = await aiAxios.post<SubdomainSuggestionResponse>('/api/v1/store/subdomain-suggestions', payload);
    if (res.data?.success && res.data.data) {
      return {
        domain: res.data.data.domain,
        suggestions: res.data.data.suggestions || [],
      };
    }
    return { domain: 'myaxova.store', suggestions: [] };
  },
};

export default aiAxios;




