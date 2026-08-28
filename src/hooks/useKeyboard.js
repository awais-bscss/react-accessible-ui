import { useEffect, useRef } from 'react';

export function useKeyboard(keyMap, isActive = true) {
  const keyMapRef = useRef(keyMap);
  useEffect(() => {
    keyMapRef.current = keyMap;
  });

  useEffect(() => {
    if (!isActive) return;

    const handler = (e) => {
      const fn = keyMapRef.current[e.key];
      if (fn) fn(e);
    };

    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [isActive]);
}
