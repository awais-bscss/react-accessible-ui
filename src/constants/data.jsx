export const TAB_ITEMS = [
  {
    label: 'What is a Re-render?',
    content: (
      <>
        <h4>React Re-rendering</h4>
        <p>
          A component re-renders whenever its <strong>state</strong> or{' '}
          <strong>props</strong> change. React compares the previous and new
          Virtual DOM trees (reconciliation) and surgically updates only what
          changed in the real DOM.
        </p>
        <p style={{ marginTop: '10px' }}>
          Keys help React identify list items during reconciliation. A stable
          key means the element is reused; a changed key unmounts and remounts it.
        </p>
      </>
    ),
  },
  {
    label: 'Custom Hooks',
    content: (
      <>
        <h4>Custom Hooks</h4>
        <p>
          Custom hooks extract <strong>stateful logic</strong> into reusable
          functions. This Tabs component uses <code>useTabs()</code> which owns
          the active index and exposes stable callbacks via{' '}
          <code>useCallback</code>.
        </p>
        <p style={{ marginTop: '10px' }}>
          Hooks enable <strong>behavior composition</strong>. You share logic
          without sharing component structure.
        </p>
      </>
    ),
  },
  {
    label: 'Compound Components',
    content: (
      <>
        <h4>Compound Component Pattern</h4>
        <p>
          Tabs, Modal, and Accordion all use this pattern. The Root component
          holds state in <strong>Context</strong>; sub-components (Trigger,
          Panel, etc.) consume it without prop drilling.
        </p>
        <p style={{ marginTop: '10px' }}>
          The consumer composes components freely:{' '}
          <code>&lt;Tabs.Root&gt; &gt; &lt;Tabs.List&gt; &gt; &lt;Tabs.Trigger&gt;</code>.
        </p>
      </>
    ),
  },
  {
    label: 'Context vs Props',
    content: (
      <>
        <h4>State Colocation &amp; Context</h4>
        <p>
          State should live as <strong>close to where it is used</strong> as
          possible (colocation). When multiple siblings need the same state,
          lift it up to a shared parent and pass via Context to avoid prop
          drilling.
        </p>
        <p style={{ marginTop: '10px' }}>
          Context is used here for <em>implicit</em> component communication,
          not as a replacement for a full state manager.
        </p>
      </>
    ),
  },
];

export const ACCORDION_ITEMS = [
  {
    title: 'What is useEffect and when should I use it?',
    content:
      'useEffect is for synchronising a component with an external system: the DOM, a timer, a subscription, a fetch. It runs after the browser paints. Always return a cleanup function if your effect sets up a subscription, timer or event listener.',
  },
  {
    title: 'What is the difference between useMemo and useCallback?',
    content:
      'useCallback memoises a function reference, useful when passing stable callbacks as props to avoid unnecessary child re-renders. useMemo memoises a computed value, useful for expensive calculations you don\'t want repeated on every render.',
  },
  {
    title: 'When should I extract a custom hook?',
    content:
      'Extract a custom hook when the same stateful logic (useState + useEffect combination, or multiple hooks working together) is needed in more than one component, or when a component\'s hook section is growing complex and deserves its own name.',
  },
  {
    title: 'What is the Compound Component pattern good for?',
    content:
      'It gives consumers full control over composition and layout without exposing a large props API. The parent holds implicit shared state via Context; sub-components use it freely. Great for flexible UI kits like modals, tabs, dropdowns and menus.',
  },
];
