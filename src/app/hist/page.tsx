'use server'


// app/history/page.tsx
import { Suspense } from 'react';
import HistoryTable from './components/HistoryTable';
import ErrorBoundary from './components/ErrorBoundary'; // Componente para manejar errores
import { fetchHistoryData } from './utils/api';
import { Loader2 } from 'lucide-react';

export default async function HistoryPage() {
  let historyData = [];
  let error: string | null = null;

  try {
    historyData = await fetchHistoryData();
  } catch (e) {
    error = e instanceof Error ? e.message : 'An unknown error occurred';
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Request History</h1>
      
      {error ? (
        <ErrorBoundary />
      ) : (
        <Suspense fallback={
          <div className='h-screen flex items-center justify-center'>
            <Loader2 />
          </div>
        }>
          <HistoryTable initialData={historyData} />
        </Suspense>
      )}
    </div>
  );
}
