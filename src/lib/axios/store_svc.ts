import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { toast } from 'sonner';

// Store creation interfaces
export interface StoreCreationRequest {
    storeName: string;
    subdomain: string;
    timezone: string;
    currency: string;
    attributes: {
        description: string;
        category: string;
        businessType?: string;
        businessSize?: string;
        platforms?: string[];
        niches?: string[];
    };
    organization: {
        name: string;
        slug: string;
        metadata: {
            industry: string;
            size: string;
        };
    };
}

export interface StoreCreationResponse {
    id: string;
    storeName: string;
    subdomain: string;
    status: string;
    createdAt: string;
    organization: {
        id: string;
        name: string;
        slug: string;
    };
}

// Response types for GET /stores/my-stores (detailed shape)
export interface StoreSummary {
    id: string;
    storeName: string;
    subdomain: string;
    storeUrl?: string;
    isActive?: boolean;
    isPublished?: boolean;
    createdAt: string;
}

export interface MyStoresApiResponse {
    success: boolean;
    data: {
        stores: StoreSummary[];
        total: number;
        user: {
            id: string;
            role: string;
        };
    };
}

export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
    code?: string;
}

export interface SubdomainCheckResponse {
    success: boolean;
    data: {
        subdomain: string;
        available: boolean;
        suggestedUrl?: string;
        reason?: string;
    };
}

// Create axios instance with advanced configuration
const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:9000/api',
    timeout: 30000, // Increased timeout for store creation
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true, // Include cookies in requests - CRITICAL for CORS
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
});

// Additional axios defaults to ensure cookies are sent
axiosInstance.defaults.withCredentials = true;

// Note: Cookie functions removed as browsers prevent manual Cookie header setting
// Cookies are sent automatically with withCredentials: true for same-origin requests

// Advanced request interceptor with authentication and cookie handling
axiosInstance.interceptors.request.use(
    async (config) => {
        // Get CSRF token from cookies if available
        const csrfToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];
            
        if (csrfToken) {
            config.headers['X-XSRF-TOKEN'] = decodeURIComponent(csrfToken);
        }

        // Enhanced session token extraction with better-auth support
        const getSessionToken = () => {
            // First, try to get the better-auth session cookie
            const betterAuthSession = document.cookie
                .split('; ')
                .find(row => row.startsWith('better-auth.session_token='));
                
            if (betterAuthSession) {
                try {
                    const sessionValue = decodeURIComponent(betterAuthSession.split('=')[1]);
                    const sessionData = JSON.parse(sessionValue);
                    console.log('🔐 Better-auth session found:', sessionData);
                    
                    // Extract the session token from the better-auth session
                    if (sessionData && sessionData.sessionToken) {
                        return sessionData.sessionToken;
                    }
                } catch (error) {
                    console.error('Failed to parse better-auth session:', error);
                }
            }
            
            // Fallback to other cookie names
            const cookieNames = [
                'better-auth.session_token',
                'session_token',
                'auth_token',
                'token',
                'access_token'
            ];
            
            for (const cookieName of cookieNames) {
                const token = document.cookie
                    .split('; ')
                    .find(row => row.startsWith(`${cookieName}=`))
                    ?.split('=')[1];
                    
                if (token) {
                    return decodeURIComponent(token);
                }
            }
            
            // Also check localStorage for token
            if (typeof window !== 'undefined') {
                const localToken = localStorage.getItem('auth_token') || 
                                 localStorage.getItem('session_token') ||
                                 localStorage.getItem('access_token');
                if (localToken) {
                    return localToken;
                }
            }
            
            return null;
        };
        
        // Debug: Log all available cookies for debugging
        console.log('🍪 All available cookies:', document.cookie);
        
        // Check if better-auth session cookie exists
        const hasBetterAuthSession = document.cookie.includes('better-auth.session_token=');
        console.log('🔐 Better-auth session cookie found:', hasBetterAuthSession ? 'Yes' : 'No');
        
        if (!hasBetterAuthSession) {
            console.warn('⚠️ No better-auth session token found - request may fail');
        } else {
            console.log('✅ Better-auth session cookie detected - extracting token for Authorization header');
            
            // Extract the session token from the better-auth session cookie
            const sessionToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('better-auth.session_token='))
                ?.split('=')[1];
            
            if (sessionToken) {
                // Decode the session token (it might be URL encoded)
                const decodedToken = decodeURIComponent(sessionToken);
                console.log('🔐 Session token (first 20 chars):', decodedToken.substring(0, 20) + '...');
                
                // Send the session token as Authorization header
                config.headers['Authorization'] = `Bearer ${decodedToken}`;
                console.log('🔐 Added Authorization header with decoded session token');
                
                // Note: We cannot manually set Cookie header due to browser security restrictions
                // The browser will automatically send cookies with withCredentials: true if same-origin
                console.log('🍪 Cookies will be sent automatically by browser (if same-origin) or via Authorization header');
            }
        }
        
        // Note: Cookies will be sent automatically by the browser when withCredentials: true
        // We cannot manually set the 'cookie' header due to browser security restrictions
        console.log('🍪 Cookies will be sent automatically by browser (withCredentials: true)');
        
        // Add request timestamp for debugging
        config.headers['X-Request-Timestamp'] = new Date().toISOString();
        
        // Log request for debugging (remove in production)
        console.log('🚀 API Request:', {
            method: config.method?.toUpperCase(),
            url: config.url,
            baseURL: config.baseURL,
            withCredentials: true,
            headers: {
                ...config.headers,
                // Show if authorization header is present but don't log the actual token
                'Authorization': config.headers['Authorization'] ? '[BEARER TOKEN PRESENT]' : '[NO AUTH HEADER]'
            },
            data: config.data ? '[DATA PRESENT]' : undefined,
            cookiesInBrowser: document.cookie ? '[COOKIES IN BROWSER]' : '[NO COOKIES IN BROWSER]'
        });

        return config;
    },
    (error: AxiosError) => {
        console.error('❌ Request Error:', error);
        toast.error('Failed to prepare request');
        return Promise.reject(error);
    }
);

// Advanced response interceptor with detailed error handling
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // Log successful responses for debugging
        console.log('✅ API Response:', {
            status: response.status,
            url: response.config.url,
            data: response.data
        });
        return response;
    },
    async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config;
        
        // Log error for debugging
        console.error('❌ API Error:', {
            status: error.response?.status,
            url: error.config?.url,
            message: error.message,
            data: error.response?.data
        });

        if (error.response) {
            const errorData = error.response.data;
            
            switch (error.response.status) {
                case 400:
                    const badRequestMsg = errorData?.message || 'Invalid request. Please check your input.';
                    toast.error(badRequestMsg);
                    break;
                case 401:
                    toast.error('Authentication failed. Please login again.');
                    // Redirect to login page
                    if (typeof window !== 'undefined') {
                        window.location.href = '/auth';
                    }
                    break;
                case 403:
                    toast.error('You do not have permission to perform this action.');
                    break;
                case 404:
                    toast.error('Resource not found.');
                    break;
                case 409:
                    const conflictMsg = errorData?.message || 'Conflict: Resource already exists.';
                    toast.error(conflictMsg);
                    break;
                case 422:
                    const validationMsg = errorData?.message || 'Validation failed. Please check your input.';
                    toast.error(validationMsg);
                    
                    // Show specific field errors if available
                    if (errorData?.errors) {
                        Object.entries(errorData.errors).forEach(([field, messages]) => {
                            if (Array.isArray(messages)) {
                                messages.forEach(msg => toast.error(`${field}: ${msg}`));
                            }
                        });
                    }
                    break;
                case 429:
                    toast.error('Too many requests. Please try again later.');
                    break;
                case 500:
                    toast.error('Server error. Please try again later.');
                    break;
                case 503:
                    toast.error('Service temporarily unavailable. Please try again later.');
                    break;
                default:
                    const defaultMsg = errorData?.message || 'An unexpected error occurred.';
                    toast.error(defaultMsg);
            }
        } else if (error.request) {
            // Network error
            toast.error('Network error. Please check your connection and try again.');
        } else {
            // Something else happened
            toast.error('An unexpected error occurred while processing your request.');
        }

        return Promise.reject(error);
    }
);


// Utility functions
const generateSubdomain = (storeName: string): string => {
    const baseSlug = storeName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 20);
    
    const randomSuffix = Math.floor(Math.random() * 9000) + 1000;
    return `${baseSlug}-${randomSuffix}`;
};

const generateOrgSlug = (orgName: string): string => {
    const baseSlug = orgName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 15);
    
    const randomSuffix = Math.floor(Math.random() * 9000) + 1000;
    return `${baseSlug}-org-${randomSuffix}`;
};

// Advanced store service with comprehensive functionality
export const storeService = {
    // Create a new store
    async createStore(formData: {
        storeName: string;
        storeDescription: string;
        businessType: string;
        businessSize: string;
        selectedPlatforms: string[];
        selectedNiches: string[];
        selectedPlan: string;
        domain: string;
        timezone?: string;
        currency?: string;
    }): Promise<StoreCreationResponse & { storeUrl?: string }> {
        try {
            // Generate subdomain and check availability first
            const subdomain = generateSubdomain(formData.storeName);
            console.log('🔍 Checking subdomain availability before creation:', subdomain);
            
            const subdomainCheck = await this.checkSubdomainAvailability(subdomain);
            
            if (!subdomainCheck.available) {
                throw new Error(`Subdomain "${subdomain}" is not available. ${subdomainCheck.reason || 'Please try a different store name.'}`);
            }

            // Prepare the request payload according to the API specification
            const payload: StoreCreationRequest = {
                storeName: formData.storeName,
                subdomain: subdomain,
                timezone: formData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
                currency: formData.currency || 'USD',
                attributes: {
                    description: formData.storeDescription || `A ${formData.businessType} store created via ASOD`,
                    category: formData.businessType.toLowerCase(),
                    businessType: formData.businessType,
                    businessSize: formData.businessSize,
                    platforms: formData.selectedPlatforms,
                    niches: formData.selectedNiches,
                },
                organization: {
                    name: `${formData.storeName} Organization`,
                    slug: generateOrgSlug(formData.storeName),
                    metadata: {
                        industry: formData.selectedNiches[0] || 'E-commerce',
                        size: formData.businessSize.toLowerCase(),
                    },
                },
            };

            console.log('📤 Creating store with payload:', payload);
            
            const response = await axiosInstance.post<StoreCreationResponse>('/stores', payload);
            
            // Enhanced success message with store URL
            const storeUrl = subdomainCheck.suggestedUrl || `${subdomain}.myaxova.store`;
            toast.success(`🎉 ${formData.storeName} created successfully! Visit: ${storeUrl}`);
            
            return {
                ...response.data,
                storeUrl
            };
            
        } catch (error) {
            console.error('Failed to create store:', error);
            
            // Enhanced error handling for specific cases
            if (error instanceof Error) {
                if (error.message.includes('Subdomain') && error.message.includes('not available')) {
                    toast.error(error.message);
                }
            }
            
            throw error;
        }
    },

    // Check subdomain availability using the correct endpoint
    async checkSubdomainAvailability(subdomain: string): Promise<{ 
        available: boolean; 
        suggestedUrl?: string; 
        reason?: string;
        suggestions?: string[] 
    }> {
        try {
            const response = await axiosInstance.get<SubdomainCheckResponse>(`/stores/check-subdomain/${encodeURIComponent(subdomain)}`);
            
            console.log('🔍 Subdomain check response:', response.data);
            
            if (response.data.success && response.data.data) {
                const { available, suggestedUrl, reason } = response.data.data;
                
                // Show success message with suggested URL if available
                if (available && suggestedUrl) {
                    toast.success(`✅ "${subdomain}" is available! Your store will be at: ${suggestedUrl}`);
                } else if (!available && reason) {
                    toast.error(`❌ "${subdomain}" is not available. ${reason}`);
                }
                
                return {
                    available,
                    suggestedUrl: available ? suggestedUrl : undefined,
                    reason: !available ? reason : undefined,
                    suggestions: !available ? [
                        `${subdomain}-store`,
                        `${subdomain}-shop`,
                        `my-${subdomain}`,
                        `${subdomain}-${Math.floor(Math.random() * 100)}`
                    ] : undefined
                };
            }
            
            throw new Error('Invalid response format');
        } catch (error) {
            console.error('Failed to check subdomain availability:', error);
            
            // Only show error toast if it's a network error, not a validation error
            if (error instanceof Error && error.message !== 'Invalid response format') {
                toast.error('Could not check subdomain availability. Using offline validation.');
            }
            
            // Return a default response for fallback
            const isValidFormat = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(subdomain);
            const isReserved = ["taken", "unavailable", "admin", "api", "www", "app", "mail"].includes(subdomain.toLowerCase());
            
            return {
                available: subdomain.length > 3 && isValidFormat && !isReserved,
                reason: !isValidFormat ? "Invalid subdomain format" : isReserved ? "Reserved subdomain" : undefined,
                suggestions: subdomain.length > 3 ? [
                    `${subdomain}-store`,
                    `${subdomain}-shop`,
                    `my-${subdomain}`,
                    `${subdomain}-${Math.floor(Math.random() * 100)}`
                ] : []
            };
        }
    },

    // Legacy method for backward compatibility - now uses subdomain check
    async checkStoreNameAvailability(storeName: string): Promise<{ available: boolean; suggestions?: string[] }> {
        const subdomain = generateSubdomain(storeName);
        const result = await this.checkSubdomainAvailability(subdomain);
        
        return {
            available: result.available,
            suggestions: result.suggestions
        };
    },



    // Get user's stores
    async getUserStores(): Promise<StoreCreationResponse[]> {
        try {
            // Backward-compatible: if API returns array directly
            const response = await axiosInstance.get('/stores/my-stores');

            // New detailed shape: { success, data: { stores, total, user } }
            const body = response.data as MyStoresApiResponse | StoreCreationResponse[];
            if (Array.isArray(body)) {
                return body;
            }

            if (body && (body as MyStoresApiResponse).success && (body as MyStoresApiResponse).data?.stores) {
                const stores = (body as MyStoresApiResponse).data.stores;
                // Map to legacy StoreCreationResponse shape as best-effort
                return stores.map((s) => ({
                    id: s.id,
                    storeName: s.storeName,
                    subdomain: s.subdomain,
                    status: s.isActive ? 'active' : 'inactive',
                    createdAt: s.createdAt,
                    organization: {
                        id: '',
                        name: '',
                        slug: '',
                    },
                }));
            }

            throw new Error('Unexpected response format for /stores/my-stores');
        } catch (error) {
            console.error('Failed to get user stores:', error);
            throw error;
        }
    },

    // Get user's stores (detailed)
    async getMyStores(): Promise<{ stores: StoreSummary[]; total: number; user: { id: string; role: string } }> {
        try {
            const response = await axiosInstance.get<MyStoresApiResponse>('/stores/my-stores');
            if (response.data?.success && response.data.data) {
                return {
                    stores: response.data.data.stores || [],
                    total: response.data.data.total || (response.data.data.stores?.length ?? 0),
                    user: response.data.data.user,
                };
            }

            // Fallback for legacy array response
            const legacy = (response.data as unknown) as StoreCreationResponse[];
            if (Array.isArray(legacy)) {
                const stores: StoreSummary[] = legacy.map((s) => ({
                    id: s.id,
                    storeName: s.storeName,
                    subdomain: s.subdomain,
                    createdAt: s.createdAt,
                    storeUrl: `${s.subdomain}.myaxova.store`,
                    isActive: s.status === 'active',
                    isPublished: true,
                }));
                return { stores, total: stores.length, user: { id: '', role: 'user' } };
            }

            throw new Error('Unexpected response format for /stores/my-stores');
        } catch (error) {
            console.error('Failed to get my stores:', error);
            throw error;
        }
    },

    // Get store by ID
    async getStore(storeId: string): Promise<StoreCreationResponse> {
        try {
            const response = await axiosInstance.get<StoreCreationResponse>(`/stores/${storeId}`);
            return response.data;
        } catch (error) {
            console.error('Failed to get store:', error);
            throw error;
        }
    },

    // Update store
    async updateStore(storeId: string, updates: Partial<StoreCreationRequest>): Promise<StoreCreationResponse> {
        try {
            const response = await axiosInstance.patch<StoreCreationResponse>(`/stores/${storeId}`, updates);
            toast.success('Store updated successfully!');
            return response.data;
        } catch (error) {
            console.error('Failed to update store:', error);
            throw error;
        }
    },

    // Delete store
    async deleteStore(storeId: string): Promise<void> {
        try {
            await axiosInstance.delete(`/stores/${storeId}`);
            toast.success('Store deleted successfully!');
        } catch (error) {
            console.error('Failed to delete store:', error);
            throw error;
        }
    },

    // Test subdomain availability endpoint directly
    async testSubdomainEndpoint(testSubdomain: string = 'test-store'): Promise<void> {
        try {
            console.log(`🧪 Testing subdomain endpoint with: ${testSubdomain}`);
            
            const response = await axiosInstance.get<SubdomainCheckResponse>(`/stores/check-subdomain/${testSubdomain}`);
            
            console.log('✅ Subdomain endpoint test response:', response.data);
            
            if (response.data.success) {
                const { subdomain, available, suggestedUrl, reason } = response.data.data;
                
                if (available) {
                    toast.success(`✅ Test successful! "${subdomain}" is available at: ${suggestedUrl}`);
                } else {
                    toast.info(`ℹ️ Test successful! "${subdomain}" is not available. ${reason || ''}`);
                }
            } else {
                toast.error('❌ Test failed: Invalid response format');
            }
            
        } catch (error) {
            console.error('❌ Subdomain endpoint test failed:', error);
            toast.error('❌ Subdomain endpoint test failed. Check console for details.');
        }
    },

    // Debug authentication status
    debugAuthStatus(): void {
        console.log('🔍 Debugging authentication status...');
        
        // Check all cookies
        console.log('🍪 All Cookies:', document.cookie);
        
        // Note: Cookie headers cannot be manually set due to browser security restrictions
        console.log('📤 Cookie headers will be sent automatically by browser (if same-origin)');
        
        // Check specifically for better-auth.session_token
        const betterAuthSessionToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('better-auth.session_token='))
            ?.split('=')[1];
        console.log('🔐 Better-auth session token found:', betterAuthSessionToken ? 'Yes' : 'No');
        if (betterAuthSessionToken) {
            console.log('🔐 Better-auth session token value:', betterAuthSessionToken);
        }
        
        // Check localStorage
        if (typeof window !== 'undefined') {
            console.log('💾 localStorage auth tokens:');
            console.log('- auth_token:', localStorage.getItem('auth_token'));
            console.log('- session_token:', localStorage.getItem('session_token'));
            console.log('- access_token:', localStorage.getItem('access_token'));
        }
        
        // Check for better-auth session specifically
        const betterAuthSession = document.cookie
            .split('; ')
            .find(row => row.startsWith('better-auth.session='));
        console.log('🔐 Better-auth session cookie:', betterAuthSession);
        
        if (betterAuthSession) {
            try {
                const sessionValue = decodeURIComponent(betterAuthSession.split('=')[1]);
                const sessionData = JSON.parse(sessionValue);
                console.log('📋 Better-auth session data:', sessionData);
                
                if (sessionData && sessionData.sessionToken) {
                    console.log('✅ Better-auth session token found:', sessionData.sessionToken);
                } else {
                    console.log('❌ No session token in better-auth session');
                }
            } catch (error) {
                console.error('❌ Failed to parse better-auth session:', error);
            }
        } else {
            console.log('❌ No better-auth.session cookie found');
        }
        
        // Test token extraction
        const getSessionToken = () => {
            // First, try to get the better-auth session cookie
            const betterAuthSession = document.cookie
                .split('; ')
                .find(row => row.startsWith('better-auth.session='));
                
            if (betterAuthSession) {
                try {
                    const sessionValue = decodeURIComponent(betterAuthSession.split('=')[1]);
                    const sessionData = JSON.parse(sessionValue);
                    
                    // Extract the session token from the better-auth session
                    if (sessionData && sessionData.sessionToken) {
                        return sessionData.sessionToken;
                    }
                } catch (error) {
                    console.error('Failed to parse better-auth session:', error);
                }
            }
            
            // Fallback to other cookie names
            const cookieNames = [
                'better-auth.session_token',
                'session_token',
                'auth_token',
                'token',
                'access_token'
            ];
            
            for (const cookieName of cookieNames) {
                const token = document.cookie
                    .split('; ')
                    .find(row => row.startsWith(`${cookieName}=`))
                    ?.split('=')[1];
                    
                if (token) {
                    return decodeURIComponent(token);
                }
            }
            
            if (typeof window !== 'undefined') {
                const localToken = localStorage.getItem('auth_token') || 
                                 localStorage.getItem('session_token') ||
                                 localStorage.getItem('access_token');
                if (localToken) {
                    return localToken;
                }
            }
            
            return null;
        };
        
        const token = getSessionToken();
        console.log('🎯 Extracted token:', token ? 'Found' : 'Not found');
        
        if (!token) {
            toast.error('❌ No authentication token found. Please login first.');
        } else {
            toast.success('✅ Authentication token found and ready to use.');
        }
    },

    // Set authentication token manually (for testing)
    setAuthToken(token: string, storage: 'cookie' | 'localStorage' = 'localStorage'): void {
        if (storage === 'localStorage' && typeof window !== 'undefined') {
            localStorage.setItem('auth_token', token);
            console.log('💾 Token stored in localStorage');
        } else {
            // Set cookie (this is limited by browser security)
            document.cookie = `auth_token=${token}; path=/; max-age=86400`;
            console.log('🍪 Token stored in cookie');
        }
        
        toast.success('🔐 Authentication token set successfully');
    },

    // Set better-auth session manually (for testing)
    setBetterAuthSession(sessionData: any): void {
        if (typeof window !== 'undefined') {
            try {
                // Create the better-auth session cookie format
                const sessionValue = JSON.stringify(sessionData);
                const encodedSession = encodeURIComponent(sessionValue);
                
                // Set the better-auth session cookie
                document.cookie = `better-auth.session=${encodedSession}; path=/; max-age=86400; SameSite=Lax`;
                
                console.log('🔐 Better-auth session set:', sessionData);
                toast.success('🔐 Better-auth session set successfully');
            } catch (error) {
                console.error('Failed to set better-auth session:', error);
                toast.error('Failed to set better-auth session');
            }
        }
    },

    // Set better-auth session token directly (for testing)
    setBetterAuthSessionToken(token: string): void {
        if (typeof window !== 'undefined') {
            try {
                // Set the better-auth session token cookie directly
                document.cookie = `better-auth.session_token=${token}; path=/; max-age=86400; SameSite=Lax`;
                
                console.log('🔐 Better-auth session token set:', token);
                toast.success('🔐 Better-auth session token set successfully');
            } catch (error) {
                console.error('Failed to set better-auth session token:', error);
                toast.error('Failed to set better-auth session token');
            }
        }
    },

    // Extract session token from better-auth session
    extractSessionToken(): string | null {
        const betterAuthSession = document.cookie
            .split('; ')
            .find(row => row.startsWith('better-auth.session='));
            
        if (betterAuthSession) {
            try {
                const sessionValue = decodeURIComponent(betterAuthSession.split('=')[1]);
                const sessionData = JSON.parse(sessionValue);
                
                if (sessionData && sessionData.sessionToken) {
                    return sessionData.sessionToken;
                }
            } catch (error) {
                console.error('Failed to parse better-auth session:', error);
            }
        }
        
        return null;
    },

    // Test request headers that would be sent
    testRequestHeaders(): void {
        console.log('🧪 Testing request headers...');
        
        const sessionToken = this.extractSessionToken();
        
        // Check specifically for better-auth.session_token
        const betterAuthSessionToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('better-auth.session_token='))
            ?.split('=')[1];
            
        const headers = {
            'content-type': 'application/json',
            'accept': 'application/json',
            'x-requested-with': 'XMLHttpRequest',
            'authorization': betterAuthSessionToken ? `Bearer ${betterAuthSessionToken}` : (sessionToken ? `Bearer ${sessionToken}` : undefined),
            'x-request-timestamp': new Date().toISOString()
        };
        
        console.log('📤 Request headers that would be sent:', headers);
        console.log('🍪 Cookie header: Will be sent automatically by browser (withCredentials: true)');
        console.log('🔐 Better-auth session token:', betterAuthSessionToken ? 'Found' : 'Not found');
        console.log('🔐 Authorization header:', betterAuthSessionToken ? `Bearer ${betterAuthSessionToken}` : (sessionToken ? `Bearer ${sessionToken}` : 'Not set'));
        
        if (!sessionToken && !betterAuthSessionToken) {
            toast.warning('⚠️ No session token found - authentication may fail');
        } else {
            toast.success('✅ Session token found and would be sent');
        }
    },

    // Test what authentication method the backend expects
    async testAuthMethods(): Promise<void> {
        try {
            console.log('🧪 Testing different authentication methods...');
            
            const sessionToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('better-auth.session_token='))
                ?.split('=')[1];
            
            if (!sessionToken) {
                console.error('❌ No session token found for testing');
                return;
            }
            
            const decodedToken = decodeURIComponent(sessionToken);
            
            // Test 1: Only Authorization header
            console.log('🧪 Test 1: Authorization header only');
            try {
                const response1 = await axios.get('http://127.0.0.1:9000/api/health', {
                    headers: {
                        'Authorization': `Bearer ${decodedToken}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: false
                });
                console.log('✅ Test 1 SUCCESS - Backend accepts Authorization header');
            } catch (error: any) {
                console.log('❌ Test 1 FAILED - Authorization header not accepted:', error.response?.status);
            }
            
            // Test 2: Only cookies with withCredentials
            console.log('🧪 Test 2: Cookies only with withCredentials');
            try {
                const response2 = await axios.get('http://127.0.0.1:9000/api/health', {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('✅ Test 2 SUCCESS - Backend accepts cookies');
            } catch (error: any) {
                console.log('❌ Test 2 FAILED - Cookies not accepted:', error.response?.status);
            }
            
            // Test 3: Both Authorization header and cookies
            console.log('🧪 Test 3: Both Authorization header and cookies');
            try {
                const response3 = await axios.get('http://127.0.0.1:9000/api/health', {
                    headers: {
                        'Authorization': `Bearer ${decodedToken}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
                console.log('✅ Test 3 SUCCESS - Backend accepts both');
            } catch (error: any) {
                console.log('❌ Test 3 FAILED - Both methods failed:', error.response?.status);
            }
            
        } catch (error) {
            console.error('❌ Auth testing failed:', error);
        }
    },

    // Test actual API call with current headers (for debugging)
    async testActualRequest(): Promise<void> {
        try {
            console.log('🧪 Testing actual API request headers...');
            
            // Make a test request to a non-existent endpoint to see headers
            const response = await axiosInstance.get('/test-headers');
        } catch (error: any) {
            // We expect this to fail, but we can see the request headers in the network tab
            console.log('🧪 Test request completed (error expected)');
            console.log('📤 Check Network tab in DevTools to see actual request headers sent');
            
            if (error.config) {
                console.log('📤 Request config headers:', error.config.headers);
            }
            
            toast.info('🧪 Test request sent - check Network tab for headers');
        }
    },

    // Set a test cookie to verify cookie functionality
    setTestCookie(): void {
        if (typeof window !== 'undefined') {
            const testValue = 'test-cookie-value-' + Date.now();
            document.cookie = `test-cookie=${testValue}; path=/; max-age=3600; SameSite=Lax`;
            console.log('🍪 Test cookie set:', testValue);
            
            // Verify it was set
            const cookies = document.cookie;
            console.log('🍪 All cookies after setting test cookie:', cookies);
            
            if (cookies.includes('test-cookie')) {
                toast.success('✅ Test cookie set successfully');
            } else {
                toast.error('❌ Failed to set test cookie');
            }
        }
    }
};

// Legacy API methods for backward compatibility
export const api = {
    get: <T>(url: string, config = {}) =>
        axiosInstance.get<T>(url, config),

    post: <T>(url: string, data = {}, config = {}) =>
        axiosInstance.post<T>(url, data, config),

    put: <T>(url: string, data = {}, config = {}) =>
        axiosInstance.put<T>(url, data, config),

    delete: <T>(url: string, config = {}) =>
        axiosInstance.delete<T>(url, config),

    patch: <T>(url: string, data = {}, config = {}) =>
        axiosInstance.patch<T>(url, data, config),
};

export default axiosInstance;