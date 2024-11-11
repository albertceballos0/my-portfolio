import { useAuthStore } from '@/store/useAuthStore';
import axios from 'axios';



/**
 * Custom hook to interact with the API for fetching and removing history data.
 * 
 * @returns An object containing the following functions:
 * - `fetchHistoryData`: Fetches the history data for the authenticated user.
 * - `removeRequest`: Removes a specific history request by its ID.
 */
export const useApi = () => {

  // Get the user from the global state using the `useAuthStore` hook.
  const { user} = useAuthStore();

  /**
   * Fetches the history data for the current user.
   *
   * This function sends a GET request to the `/api/history/{user.email}` endpoint
   * to retrieve the history data associated with the user's email. If the user is
   * not authenticated, the function returns `null`. If the response status is not
   * 200 or the response data indicates a failure, an error is thrown.
   *
   * @returns {Promise<any>} A promise that resolves to the history data if the request is successful.
   * @throws {Error} If the HTTP response status is not 200 or the response data indicates a failure.
   */
  const fetchHistoryData = async () => {
    if (!user ) return null;
    const response = await axios.get('/api/history/' + user.email );
    if (response.status !== 200 || !response.data.success) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    if (!response.data.data) {
      throw new Error('Failed to get history data');
    }
    return response.data.data;

  };

  return {
    fetchHistoryData, 
  }
}
