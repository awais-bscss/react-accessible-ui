import { useState, useCallback, useRef } from 'react';

export function useTabs(defaultIndex = 0) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const triggerRefs = useRef([]);

  const setRef = useCallback((el, index) => {
    triggerRefs.current[index] = el;
  }, []);

  const focusTrigger = useCallback((index) => {
    triggerRefs.current[index]?.focus();
  }, []);

  const selectTab = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  return { activeIndex, selectTab, setRef, focusTrigger };
}
