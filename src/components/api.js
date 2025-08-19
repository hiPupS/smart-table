const API_URL = 'https://fake-api.apps.berlintech.ai/smart-table';

export async function fetchUsersPage(page, limit) {
    try {
        const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        throw error;
    }
}
