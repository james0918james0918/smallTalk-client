import { useEffect } from 'react';

export const useMountEffect = fn => useEffect(fn, []);
export const useAsyncMountEffect = (fn) => {
  useEffect(() => {
    fn();
  }, []);
};
