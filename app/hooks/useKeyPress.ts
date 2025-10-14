import { useEffect } from 'react';

export const useKeyPress = (targetKey: string, callback: (event: KeyboardEvent) => void) => {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        callback(event);
      }
    };
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [targetKey, callback]);
};