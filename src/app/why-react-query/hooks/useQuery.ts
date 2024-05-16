import { useState, useEffect } from 'react';
import { PokeDataType } from '../types';

export default function useQuery(url: string) {
  const [data, setData] = useState<PokeDataType>(
    Object.create(null) as PokeDataType,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortControl = new AbortController();

    const handleFetch = async () => {
      setData(Object.create(null) as PokeDataType);
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(url, { signal: abortControl.signal });

        if (res.ok === false) {
          throw new Error(`A network error occurred.`);
        }

        setTimeout(async () => {
          const json = await res.json();
          setData(json);
          setIsLoading(false);
        }, 1000);
      } catch (e: any) {
        if (e.message.includes('abort')) {
          return;
        }
        setError(e.message);
        setIsLoading(false);
      }
    };

    handleFetch();

    return () => {
      if (abortControl) {
        console.log('abort', abortControl.signal, url);
        abortControl.abort();
      }
    };
  }, [url]);

  return { data, isLoading, error };
}
