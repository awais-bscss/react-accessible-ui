import { useEffect, useRef, useLayoutEffect } from 'react';

export function useKeyboard(keyMap, isActive = true) {
  const keyMapRef = useRef(keyMap);
  useLayoutEffect(() => {
    keyMapRef.current = keyMap;
  }, [keyMap]);

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
