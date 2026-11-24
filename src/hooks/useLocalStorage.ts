import { useCallback, useEffect, useRef, useState } from 'react';

type StoredValue<T> = { key: string; value: T };
type StateUpdater<T> = T | ((current: T) => T);

function readStorage<T>(key: string, fallback: T): T {
  try {
    const saved = window.localStorage.getItem(key);
    return saved ? JSON.parse(saved) as T : fallback;
  } catch {
    return fallback;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: StateUpdater<T>) => void] {
  const initialRef = useRef(initialValue);
  const [stored, setStored] = useState<StoredValue<T>>(() => ({
    key,
    value: readStorage(key, initialRef.current),
  }));

  // Read the new account's value immediately when the storage key changes.
  const value = stored.key === key ? stored.value : readStorage(key, initialRef.current);

  useEffect(() => {
    if (stored.key !== key) {
      setStored({ key, value: readStorage(key, initialRef.current) });
      return;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(stored.value));
    } catch {
      // Keep the in-memory experience usable when browser storage is unavailable.
    }
  }, [key, stored]);

  const setValue = useCallback((nextValue: StateUpdater<T>) => {
    setStored((current) => {
      const currentValue = current.key === key
        ? current.value
        : readStorage(key, initialRef.current);
      const resolved = typeof nextValue === 'function'
        ? (nextValue as (current: T) => T)(currentValue)
        : nextValue;
      try {
        window.localStorage.setItem(key, JSON.stringify(resolved));
      } catch {
        // Keep the in-memory experience usable when browser storage is unavailable.
      }
      return { key, value: resolved };
    });
  }, [key]);

  return [value, setValue];
}
