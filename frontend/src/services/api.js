import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const generateRecipes = async (ingredients, dietaryRestrictions) => {
  const response = await axios.post(`${API_BASE_URL}/recipes/generate`, {
    ingredients,
    dietaryRestrictions: dietaryRestrictions || '',
  });
  return response.data;
};
