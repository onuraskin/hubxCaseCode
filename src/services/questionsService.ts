import api from './api';

const QUESTIONS_ENDPOINT =
  'https://dummy-api-jtg6bessta-ey.a.run.app/getQuestions';

export const getQuestions = async () => {
  try {
    const response = await api.get(QUESTIONS_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};
