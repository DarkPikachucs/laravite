import axios from 'axios';

const API_BASE_URL = 'http://laravite.test/api/'; // Replace with your API base URL

const apiService = axios.create({
    baseURL: API_BASE_URL,
});

export const projectData = async () => {
    try {
        const response = await apiService.get('/projects?year=2025');
        return response.data;
    } catch (error) {
        throw error;
    }
};
