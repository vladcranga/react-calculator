// api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const calculate = async (operation, num1, num2 = null) => {
    try {
      const payload = {
        operation,
        num1: parseFloat(num1),
        num2: num2 !== null ? parseFloat(num2) : null
      };
      console.log('Sending payload:', payload);

      const response = await axios.post(API_URL, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('API response:', response.data);

      return response.data.result;

    } 
    
    catch (error) {
      console.error('Failed API call:', error.response ? error.response.data : error.message);
      throw error;
    }
  };