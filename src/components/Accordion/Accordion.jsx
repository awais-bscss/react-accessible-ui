import { createContext, useContext, useCallback, useMemo, useRef } from 'react';
import { useAccordion } from '../../hooks/useAccordion';

const AccordionContext  = createContext(null);
const AccordionItemCtx = createContext(null);

function useAccordionCtx() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('Accordion sub-components must be used inside <Accordion.Root>');
  return ctx;
}

function useAccordionItemCtx() {
  const ctx = useContext(AccordionItemCtx);
  if (!ctx) throw new Error('Accordion.Trigger/Panel must be used inside <Accordion.Item>');
  return ctx;
}

function Root({ mode = 'single', defaultOpen = [], children, id = 'accordion' }) {
  const { toggle, isOpen, setRef, focusItem } = useAccordion({ mode, defaultOpen });

  const countRef = useRef(0);
  countRef.current = 0;

  const ctx = useMemo(
    () => ({ toggle, isOpen, setRef, focusItem, id, countRef }),
    [toggle, isOpen, setRef, focusItem, id]
  );

  return (
    <AccordionContext.Provider value={ctx}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
}

function Item({ index, children }) {
  const { isOpen, countRef } = useAccordionCtx();

  countRef.current = Math.max(countRef.current, index + 1);

  const open = isOpen(index);
  const itemCtx = useMemo(() => ({ index, open }), [index, open]);

  return (
    <AccordionItemCtx.Provider value={itemCtx}>
      <div
        className={`accordion-item${open ? ' accordion-item--open' : ''}`}
        data-state={open ? 'open' : 'closed'}
      >
        {children}
      </div>
    </AccordionItemCtx.Provider>
  );
}

function Trigger({ children }) {
  const { toggle, setRef, focusItem, id, countRef } = useAccordionCtx();
  const { index, open } = useAccordionItemCtx();

  const handleKeyDown = useCallback((e) => {
    const count = countRef.current;
    if      (e.key === 'ArrowDown') { e.preventDefault(); focusItem((index + 1) % count); }
    else if (e.key === 'ArrowUp')   { e.preventDefault(); focusItem((index - 1 + count) % count); }
    else if (e.key === 'Home')      { e.preventDefault(); focusItem(0); }
    else if (e.key === 'End')       { e.preventDefault(); focusItem(count - 1); }
  }, [index, countRef, focusItem]);

  return (
    <button
      ref={(el) => setRef(el, index)}
      id={`${id}-trigger-${index}`}
      aria-expanded={open}
      aria-controls={`${id}-panel-${index}`}
      className="accordion-trigger"
      onClick={() => toggle(index)}
      onKeyDown={handleKeyDown}
      type="button"
    >
      <span>{children}</span>
      <span className="accordion-trigger__icon" aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </button>
  );
}

function Panel({ children }) {
  const { id } = useAccordionCtx();
  const { index, open } = useAccordionItemCtx();

  return (
    <div
      id={`${id}-panel-${index}`}
      role="region"
      aria-labelledby={`${id}-trigger-${index}`}
      hidden={!open}
      className="accordion-panel"
    >
      <div className="accordion-panel__inner">
        {children}
      </div>
    </div>
  );
}

export const Accordion = { Root, Item, Trigger, Panel };
