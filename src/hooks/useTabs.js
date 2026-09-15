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

  const handleKeyDown = useCallback(
    (e) => {
      const count = triggerRefs.current.filter(Boolean).length;
      if (count === 0) return;

      let next = activeIndex;

      if      (e.key === 'ArrowRight') next = (activeIndex + 1) % count;
      else if (e.key === 'ArrowLeft')  next = (activeIndex - 1 + count) % count;
      else if (e.key === 'Home')       next = 0;
      else if (e.key === 'End')        next = count - 1;
      else return;

      e.preventDefault();
      selectTab(next);
      focusTrigger(next);
    },
    [activeIndex, selectTab, focusTrigger]
  );

  return { activeIndex, selectTab, setRef, focusTrigger, handleKeyDown };
}

