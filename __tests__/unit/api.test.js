import axios from 'axios';
import { calculate } from '../../src/api';

// for unit testing
jest.mock('axios');

describe('API Integration Tests', () => {

  // avoid state leaks
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Verify that the calculate function makes an API call with 
   * the correct payload and returns the expected result.
   */
  test('calculate function calls API with correct payload', async () => {
    const mockResponse = { data: { result: 5 } };
    axios.post.mockResolvedValue(mockResponse);

    const result = await calculate('+', 2, 3);

    expect(axios.post).toHaveBeenCalledWith(
      process.env.REACT_APP_API_URL,
      { operation: '+', num1: 2, num2: 3 },
      { headers: { 'Content-Type': 'application/json' } }
    );

    expect(result).toBe(5);
  });

  /**
   * Handle errors in the calculate function
   * when the API request fails.
   */
  test('calculate function handles API errors', async () => {
    const mockError = new Error('Failed API call.');
    axios.post.mockRejectedValue(mockError);

    await expect(calculate('+', 2, 3)).rejects.toThrow('Failed API call.');
  });

  /**
   * Test how the calculate function handles special
   * operations, where only one operand is provided.
   */
  test('calculate function handles special operations', async () => {
    const mockResponse = { data: { result: 2 } };
    axios.post.mockResolvedValue(mockResponse);

    const result = await calculate('root', 4);

    expect(axios.post).toHaveBeenCalledWith(
      process.env.REACT_APP_API_URL,
      { operation: 'root', num1: 4, num2: null },
      { headers: { 'Content-Type': 'application/json' } }
    );
    
    expect(result).toBe(2);
  });

});