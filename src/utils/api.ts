import axios from 'axios';
import { RequestInterface } from '@/types';

/**
 * Sends a request to save data to the server.
 *
 * @param {string} type - The type of the request.
 * @param {RequestInterface} data - The data to be saved.
 * @returns {Promise<any>} - A promise that resolves to the response data.
 * @throws {Error} - Throws an error if the request fails.
 */
export const save_request = async ( request: RequestInterface) => {

    const res = await axios.post('/api/history', { request});

    if (res.status !== 200) {
        console.error("Error in save_request");
        throw new Error("Error in save_request");
    }
    if (res.data.id) return res.data.id;
    else throw new Error("Error in save_request");

}

export const removeRequest = async (id: string) => {
    const response = await axios.delete('/api/history/' + id);  
    if (response.status !== 200 || !response.data.success) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.data;
}


export const handleLogin = async (email : string) => {
    const response = await axios.post('api/users', { email });
    if (response.status !== 200) {
        throw new Error("Error al manejar el inicio de sesión");
    }
    return response.data;
};

