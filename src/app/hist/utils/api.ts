'use server'


export const fetchHistoryData = async () => {
    const response = await fetch(`${process.env.API_URL}/api/history`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json().then(data => data.data);
  };
  