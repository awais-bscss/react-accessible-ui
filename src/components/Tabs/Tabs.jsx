import { createContext, useContext, useCallback, useMemo } from 'react';
import { useTabs } from '../../hooks/useTabs';

const TabsContext = createContext(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs sub-components must be used inside <Tabs.Root>');
  return ctx;
}

function Root({ defaultIndex = 0, children, id = 'tabs' }) {
  const { activeIndex, selectTab, setRef, focusTrigger } = useTabs(defaultIndex);

  const ctx = useMemo(
    () => ({ activeIndex, selectTab, setRef, focusTrigger, id }),
    [activeIndex, selectTab, setRef, focusTrigger, id]
  );

  return (
    <TabsContext.Provider value={ctx}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function List({ children, label = 'Navigation tabs' }) {
  const { activeIndex, selectTab, focusTrigger } = useTabsContext();

  const count = Array.isArray(children) ? children.length : 1;

  const handleKeyDown = useCallback((e) => {
    let next = activeIndex;

    if      (e.key === 'ArrowRight') next = (activeIndex + 1) % count;
    else if (e.key === 'ArrowLeft')  next = (activeIndex - 1 + count) % count;
    else if (e.key === 'Home')       next = 0;
    else if (e.key === 'End')        next = count - 1;
    else return;

    e.preventDefault();
    selectTab(next);
    focusTrigger(next);
  }, [activeIndex, count, selectTab, focusTrigger]);

  return (
    <div
      role="tablist"
      aria-label={label}
      className="tabs__list"
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}

function Trigger({ index, children }) {
  const { activeIndex, selectTab, setRef, id } = useTabsContext();
  const isSelected = activeIndex === index;

  return (
    <button
      ref={(el) => setRef(el, index)}
      role="tab"
      id={`${id}-tab-${index}`}
      aria-selected={isSelected}
      aria-controls={`${id}-panel-${index}`}
      tabIndex={isSelected ? 0 : -1}
      className="tabs__trigger"
      onClick={() => selectTab(index)}
      type="button"
    >
      {children}
    </button>
  );
}

function Panel({ index, children }) {
  const { activeIndex, id } = useTabsContext();
  const isActive = activeIndex === index;

  return (
    <div
      role="tabpanel"
      id={`${id}-panel-${index}`}
      aria-labelledby={`${id}-tab-${index}`}
      tabIndex={isActive ? 0 : -1}
      hidden={!isActive}
      className="tabs__panel"
    >
      <div className="tabs__panel-content">
        {children}
      </div>
    </div>
  );
}

export const Tabs = { Root, List, Trigger, Panel };
