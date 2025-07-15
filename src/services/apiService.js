import axios from 'axios';

class ApiService {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL: baseURL || 'https://connections-api.goit.global',
    });
  }

  setAuthToken(token) {
    this.api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  clearAuthToken() {
    this.api.defaults.headers.common.Authorization = '';
  }

  async get(url, config = {}) {
    const response = await this.api.get(url, config);
    return response.data;
  }

  async post(url, data = {}, config = {}) {
    const response = await this.api.post(url, data, config);
    return response.data;
  }

  async put(url, data = {}, config = {}) {
    const response = await this.api.put(url, data, config);
    return response.data;
  }

  async delete(url, config = {}) {
    const response = await this.api.delete(url, config);
    return response.data;
  }

  async auth(endpoint, credentials) {
    return this.post(`/users/${endpoint}`, credentials);
  }

  async logout() {
    return this.post('/users/logout');
  }

  async getCurrentUser() {
    return this.get('/users/current');
  }

  async getContacts() {
    return this.get('/contacts');
  }

  async createContact(contact) {
    return this.post('/contacts', contact);
  }

  async updateContact(contactId, contactData) {
    return this.put(`/contacts/${contactId}`, contactData);
  }

  async deleteContact(contactId) {
    return this.delete(`/contacts/${contactId}`);
  }
}

export const apiService = new ApiService();
export default ApiService;
