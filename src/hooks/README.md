# Custom Hooks

All hooks are single-responsibility and reusable. Each is documented below.

---

## `useModal`

Manages open/close state for a modal dialog.

```js
const { isOpen, open, close } = useModal(defaultOpen = false);
```

| Return | Type | Description |
|--------|------|-------------|
| `isOpen` | `boolean` | Whether the modal is open |
| `open` | `() => void` | Opens the modal |
| `close` | `() => void` | Closes the modal |

**React hooks used:** `useState`, `useCallback`

---

## `useTabs`

Manages active tab index and trigger element refs for keyboard focus.

```js
const { activeIndex, selectTab, setRef, focusTrigger } = useTabs(defaultIndex = 0);
```

| Return | Type | Description |
|--------|------|-------------|
| `activeIndex` | `number` | Index of the currently active tab |
| `selectTab` | `(index) => void` | Sets the active tab |
| `setRef` | `(el, index) => void` | Stores trigger element ref |
| `focusTrigger` | `(index) => void` | Programmatically focuses a trigger |

**React hooks used:** `useState`, `useRef`, `useCallback`

---

## `useAccordion`

Manages which accordion items are open. Supports `single` and `multiple` modes.

```js
const { toggle, isOpen, setRef, focusItem } = useAccordion({ mode, defaultOpen });
```

| Return | Type | Description |
|--------|------|-------------|
| `toggle` | `(index) => void` | Opens or closes an item |
| `isOpen` | `(index) => boolean` | Whether an item is open |
| `setRef` | `(el, index) => void` | Stores trigger element ref |
| `focusItem` | `(index) => void` | Programmatically focuses a trigger |

**React hooks used:** `useState`, `useRef`, `useCallback`

---

## `useFocusTrap`

Traps keyboard focus inside a container while active. Returns a ref to attach to the container.

```js
const containerRef = useFocusTrap(isActive);
```

- Focuses the first focusable child on activation
- Falls back to focusing the container itself if no focusable children exist
- `Tab` / `Shift+Tab` cycle within the container

**React hooks used:** `useEffect`, `useRef`, `useCallback`

---

## `useKeyboard`

Attaches a global `keydown` listener that calls a handler from a key map.

```js
useKeyboard({ Escape: () => close() }, isActive);
```

Uses a **ref pattern** to avoid stale closures. `keyMapRef` is kept current on every render via a bare effect, while the subscription effect only re-runs when `isActive` changes.

**React hooks used:** `useEffect`, `useRef`
