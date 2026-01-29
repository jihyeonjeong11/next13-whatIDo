// https://stackoverflow.com/questions/54633690/how-can-i-use-multiple-refs-for-an-array-of-elements-with-hooks
import { useCallback, useEffect, useRef } from 'react';

const useRefs = <T = HTMLElement>() => {
  const itemsRef = useRef<Record<string, T | null>>({});

  const setRef = useCallback((id: string, el: T | null) => {
    itemsRef.current[id] = el;
  }, []);

  const getRef = useCallback((id: string) => {
    if (!(id in itemsRef.current)) {
      throw new Error(`id ${id} does not exist in itemsRef`);
    }
    return itemsRef.current[id];
  }, []);

  const getAllRefs = useCallback(() => itemsRef.current ?? {}, []);

  useEffect(() => {
    // Clean up any extra references if needed
    itemsRef.current = { ...itemsRef.current };
    return () => {
      // Clean up when unmounted
      itemsRef.current = {};
    };
  }, []);

  return {
    getAllRefs,
    getRef,
    setRef,
  };
};

export default useRefs;
