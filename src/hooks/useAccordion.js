import { useState, useCallback, useRef } from 'react';

export function useAccordion({ mode = 'single', defaultOpen = [] } = {}) {
  const [openItems, setOpenItems] = useState(() => new Set(defaultOpen));
  const itemRefs = useRef([]);

  const setRef = useCallback((el, index) => {
    itemRefs.current[index] = el;
  }, []);

  const toggle = useCallback((index) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (mode === 'single') next.clear();
        next.add(index);
      }
      return next;
    });
  }, [mode]);

  const isOpen = useCallback((index) => openItems.has(index), [openItems]);

  const focusItem = useCallback((index) => {
    itemRefs.current[index]?.focus();
  }, []);

  return { toggle, isOpen, setRef, focusItem };
}
