// Uses the 'calculate' function to interact with an API
// to perform operations.

// for making API requests
import axios from 'axios';

// the base URL of the API
const API_URL = process.env.REACT_APP_API_URL;

/**
 * Sends a calculation request to the API.
 * 
 * Takes an arithmetic operation and two numbers, sends them as a payload
 * to the API, and returns the result of the operation from the API response.
 * 
 * @param {string} operation - The operation to perform.
 * @param {number} num1 - The first number in the calculation.
 * @param {number|null} [num2=null] - The second number in the calculation.
 * 
 * @returns {Promise<number>} - The result of the operation returned by the API.
 * 
 * @throws an error if the API call fails.
 */
export const calculate = async (operation, num1, num2 = null) => {
    try {
        // the payload for the API request
        const payload = {
            operation,
            num1: parseFloat(num1),
            num2: num2 !== null ? parseFloat(num2) : null
        };
        
        console.log('Sending payload:', payload);

        // make a POST request to the API
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
