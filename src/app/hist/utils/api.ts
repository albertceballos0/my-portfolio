'use server'

import { headers } from 'next/headers';

export const fetchHistoryData = async () => {
  const headersData = await headers();
  const host = headersData.get('host');
  const protocol = headersData.get('x-forwarded-proto') || 'http'; // Usa 'https' en producción si es necesario
  const currentURL = `${protocol}://${host}`;

  console.log('currentURL', currentURL);
  const response = await fetch(`${currentURL}/api/history`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json().then(data => data.data);
};