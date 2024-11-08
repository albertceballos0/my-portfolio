import axios from 'axios';

export const fetchHistoryData = async () => {

  const response = await axios.get('/api/history');
  if (response.status !== 200 || !response.data.success) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.data.data;
};

export const removeRequest = async (id: number) => {

  const response = await axios.delete('/api/history/' + id);  
  if (response.status !== 200 || !response.data.success) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.data;
}