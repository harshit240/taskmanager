import { useState, useCallback } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      return initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      setStoredValue(value);
    } catch (error) {
      console.error('Error setting value:', error);
    }
  }, []);

  return [storedValue, setValue];
};

export default useLocalStorage;
