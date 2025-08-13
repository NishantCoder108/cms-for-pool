import axios from 'axios';

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const ADMIN_EMAIL = process.env.DIRECTUS_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.DIRECTUS_ADMIN_PASSWORD;

export class DirectusService {
    private token: string | null = null;

    private async getToken() {
        if (!this.token) {
            console.log('🔐 Getting new token...');

            const response = await axios.post(`${DIRECTUS_URL}/auth/login`, {
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD
            });

            this.token = response.data.data.access_token;
            console.log('✅ Token obtained');
        }
        return this.token;
    }

    private async makeRequest<T>(requestFn: (token: string | null) => Promise<T>): Promise<T> {
        try {
            const token = await this.getToken();
            return await requestFn(token);

        } catch (error: any) {
            if (error.response?.status === 401) {
                console.log('🔄 Token expired, getting new one...');
                this.token = null; // Clear expired token

                const token = await this.getToken();
                return await requestFn(token);
            }
            throw error;
        }
    }

    async getItems(collection: string, params: any = {}) {
        return this.makeRequest(async (token) => {
            console.log(`🔍 Fetching ${collection}...`);
            const response = await axios.get(`${DIRECTUS_URL}/items/${collection}`, {
                headers: { 'Authorization': `Bearer ${token}` },
                params
            });
            console.log(`✅ Successfully fetched ${collection}`);
            return response.data.data;
        });
    }

    async getItem(collection: string, id: string) {
        return this.makeRequest(async (token) => {
            const response = await axios.get(`${DIRECTUS_URL}/items/${collection}/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return response.data.data;
        });
    }
}

export const directusService = new DirectusService();
