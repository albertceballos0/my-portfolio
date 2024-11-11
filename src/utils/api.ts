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

export const fetch_TSPRequest = async (id : string) => {
    const res = await axios.get('/api/get-request?id='+ id);

    if (res.status !== 200) {
        console.error("Error in fetch_TSPrequest");
        throw new Error("Error in fetch_TSPrequest");
    }
    return res.data;
}