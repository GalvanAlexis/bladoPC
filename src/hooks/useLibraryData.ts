import { useState, useEffect } from 'react';
import { LibraryData } from '@/lib/libraryTypes';

export function useLibraryData() {
  const [data, setData] = useState<LibraryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/library');
        if (!res.ok) {
          throw new Error('Failed to fetch library data');
        }
        const json = await res.json();
        setData(json);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Error desconocido');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}
