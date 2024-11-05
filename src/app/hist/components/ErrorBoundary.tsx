// app/history/components/ErrorBoundary.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMessageStore } from '@/store/useMessageStore';

export default function ErrorBoundary() {

  const router = useRouter();
  const { setMessage } = useMessageStore();

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
      setMessage('Error loading hist', 'error');
    }, 2000);
    }, [router]);

  return (
        <>
        
        </>
  );
}
