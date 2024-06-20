import axios from 'axios';

// Replace with your actual API Gateway endpoint
const API_ENDPOINT = 'https://your-api-gateway-endpoint/your-resource';

export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
