import { useState, useEffect } from 'react';
import { PokeDataType } from '../types';

export default function useQuery(url: string) {
  const [data, setData] = useState<PokeDataType>(
    Object.create(null) as PokeDataType,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    const handleFetch = async () => {
      setData(Object.create(null) as PokeDataType);
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(url);

        if (ignore) {
          return;
        }

        if (res.ok === false) {
          throw new Error(`A network error occurred.`);
        }

        const json = await res.json();

        setData(json);
        setIsLoading(false);
      } catch (e: any) {
        setError(e.message);
        setIsLoading(false);
      }
    };

    handleFetch();

    return () => {
      ignore = true;
    };
  }, [url]);

  return { data, isLoading, error };
}
