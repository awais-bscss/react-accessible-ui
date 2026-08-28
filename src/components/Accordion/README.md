# Accordion Component

Accessible accordion built with the **Compound Component** pattern and two-level Context. Supports `single` mode (one item open at a time) and `multiple` mode (any number open).

---

## Usage

```jsx
import { Accordion } from './Accordion';

const items = [
  { title: 'Question one', content: 'Answer one.' },
  { title: 'Question two', content: 'Answer two.' },
];

function Example() {
  return (
    <Accordion.Root mode="single" id="faq">
      {items.map((item, i) => (
        <Accordion.Item key={i} index={i}>
          <Accordion.Trigger>{item.title}</Accordion.Trigger>
          <Accordion.Panel>{item.content}</Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
```

---

## API

| Sub-component | Props | Description |
|---------------|-------|-------------|
| `Accordion.Root` | `mode` (`single` / `multiple`), `defaultOpen` (index array), `id` | State owner. Provides `AccordionContext`. |
| `Accordion.Item` | `index` | Registers item, provides `AccordionItemCtx` with `index` + `open`. |
| `Accordion.Trigger` | none | Toggle button. Keyboard navigation handler. No `totalItems` prop needed. |
| `Accordion.Panel` | none | `role="region"`. Hidden with `hidden` attribute when closed. |

---

## Context Architecture

Two separate Context levels are used deliberately:

| Context | Consumers | Contains |
|---------|-----------|----------|
| `AccordionContext` | All sub-components | `toggle`, `isOpen`, `setRef`, `focusItem`, `id`, `countRef` |
| `AccordionItemCtx` | `Trigger`, `Panel` only | `index`, `open` |

This avoids prop drilling while keeping per-item data scoped to each item.

---

## Hooks Used

| Hook | Purpose |
|------|---------|
| `useAccordion` | Owns `openItems` Set, `toggle`, `isOpen`, trigger ref array, `focusItem` |

---

## Keyboard Support

Keyboard navigation is scoped within each `Accordion.Root`. Use `Tab` / `Shift+Tab` to move between separate accordion groups.

| Key | Action |
|-----|--------|
| `↓` Arrow Down | Next trigger (wraps to first) |
| `↑` Arrow Up | Previous trigger (wraps to last) |
| `Home` | First trigger |
| `End` | Last trigger |
| `Space` / `Enter` | Toggle open/close |
| `Tab` | Move to next focusable element |

---

## ARIA

- `aria-expanded` on each trigger
- `aria-controls` links trigger to its panel
- `role="region"` + `aria-labelledby` on each panel
- Focus ring uses `box-shadow: inset` (parent `overflow:hidden` clips `outline`)
