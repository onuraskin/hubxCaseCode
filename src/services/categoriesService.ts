import api from './api';

const CATEGORIES_ENDPOINT =
  'https://dummy-api-jtg6bessta-ey.a.run.app/getCategories';

export const getCategories = async () => {
  try {
    const response = await api.get(CATEGORIES_ENDPOINT);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
