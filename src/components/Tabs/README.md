# Tabs Component

Accessible keyboard-navigable tabs built with the **Compound Component** pattern and roving tabindex.

---

## Usage

```jsx
import { Tabs } from './Tabs';

function Example() {
  return (
    <Tabs.Root defaultIndex={0} id="my-tabs">
      <Tabs.List label="Section tabs">
        <Tabs.Trigger index={0}>Tab One</Tabs.Trigger>
        <Tabs.Trigger index={1}>Tab Two</Tabs.Trigger>
        <Tabs.Trigger index={2}>Tab Three</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Panel index={0}>Content for Tab One</Tabs.Panel>
      <Tabs.Panel index={1}>Content for Tab Two</Tabs.Panel>
      <Tabs.Panel index={2}>Content for Tab Three</Tabs.Panel>
    </Tabs.Root>
  );
}
```

---

## API

| Sub-component | Props | Description |
|---------------|-------|-------------|
| `Tabs.Root` | `defaultIndex`, `id` | State owner. Holds active index. |
| `Tabs.List` | `label` | `role="tablist"` container. Handles arrow key navigation. |
| `Tabs.Trigger` | `index` | `role="tab"` button. Roving tabindex (`0` when active, `-1` otherwise). |
| `Tabs.Panel` | `index` | `role="tabpanel"`. Hidden with `hidden` attribute (not unmounted). |

---

## Hooks Used

| Hook | Purpose |
|------|---------|
| `useTabs` | Owns `activeIndex`, trigger ref array, `selectTab`, `focusTrigger` |

---

## Keyboard Support

| Key | Action |
|-----|--------|
| `→` Arrow Right | Next tab |
| `←` Arrow Left | Previous tab |
| `Home` | First tab |
| `End` | Last tab |
| `Tab` | Move to active panel content |
| `Shift + Tab` | Move back to tab list |

---

## ARIA

- `role="tablist"` on the list container with `aria-label`
- `role="tab"` on each trigger with `aria-selected` and `aria-controls`
- `role="tabpanel"` on each panel with `aria-labelledby`
- Panels use `hidden` attribute (preserves DOM state on tab switch)
- Roving tabindex: only the active trigger has `tabIndex={0}`
