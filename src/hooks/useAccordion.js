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

  const handleKeyDown = useCallback(
    (e, currentIndex) => {
      const count = itemRefs.current.filter(Boolean).length;
      if (count === 0) return;

      if      (e.key === 'ArrowDown') { e.preventDefault(); focusItem((currentIndex + 1) % count); }
      else if (e.key === 'ArrowUp')   { e.preventDefault(); focusItem((currentIndex - 1 + count) % count); }
      else if (e.key === 'Home')      { e.preventDefault(); focusItem(0); }
      else if (e.key === 'End')       { e.preventDefault(); focusItem(count - 1); }
    },
    [focusItem]
  );

  return { toggle, isOpen, setRef, focusItem, handleKeyDown };
}

