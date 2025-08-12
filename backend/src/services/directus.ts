import axios from 'axios';

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN || '';

export class DirectusService {
  private client = axios.create({
    baseURL: DIRECTUS_URL,
    headers: {
      'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });

  async getItems(collection: string, params: any = {}) {
    try {
      const response = await this.client.get(`/items/${collection}`, { params });
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching ${collection}:`, error);
      throw error;
    }
  }

  async getItem(collection: string, id: string) {
    try {
      const response = await this.client.get(`/items/${collection}/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching ${collection} ${id}:`, error);
      throw error;
    }
  }
}

export const directusService = new DirectusService();
