# Accessible UI Components

---

## What Was Built

Three fully accessible, reusable React UI components:

| Component | Pattern | Docs |
|-----------|---------|------|
| **Modal** | Compound Components + Context + Portal | [Modal README](./src/components/Modal/README.md) |
| **Tabs** | Compound Components + Context + useMemo | [Tabs README](./src/components/Tabs/README.md) |
| **Accordion** | Compound Components + Two-level Context | [Accordion README](./src/components/Accordion/README.md) |

Custom hooks powering the components: [Hooks README](./src/hooks/README.md)

---

## Project Structure

```
src/
├── hooks/
│   ├── useFocusTrap.js
│   ├── useKeyboard.js
│   ├── useModal.js
│   ├── useTabs.js
│   └── useAccordion.js
├── components/
│   ├── Modal/
│   │   ├── Modal.jsx
│   │   └── README.md
│   ├── Tabs/
│   │   ├── Tabs.jsx
│   │   └── README.md
│   └── Accordion/
│       ├── Accordion.jsx
│       └── README.md
├── constants/
│   └── data.jsx
├── Demo/
│   ├── ModalDemo.jsx
│   ├── TabsDemo.jsx
│   ├── AccordionDemo.jsx
│   └── Section.jsx
├── App.jsx
├── index.css
└── main.jsx
```

---

## Run Locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

---

## Core React Concepts Used

| Concept | Where |
|---------|-------|
| `useState` | `useModal`, `useTabs`, `useAccordion` |
| `useEffect` + cleanup | `useFocusTrap`, `useKeyboard`, Modal body-scroll lock |
| `useRef` | `useFocusTrap` (container ref), `useTabs` (trigger refs), `useAccordion` (item refs), `useKeyboard` (keyMap ref) |
| Controlled components | Form inside Form Modal |
| Keys | `TAB_ITEMS.map(…, i)` and `ACCORDION_ITEMS.map(…, i)` |

### useEffect Justifications

| Hook / File | Why useEffect | Cleanup |
|-------------|---------------|---------|
| `useFocusTrap` | Attach Tab-cycling keydown after DOM renders | Removes listener on close |
| `useKeyboard` (sync effect) | Keep `keyMapRef` current on every render | None needed |
| `useKeyboard` (subscribe effect) | Attach Escape keydown when `isActive` | Removes listener on unmount |
| `Modal.Root` | Lock `document.body.overflow` when open | Restores overflow on close |

---

## React Concepts Used

| Concept | Where |
|---------|-------|
| Custom hooks | `useFocusTrap`, `useKeyboard`, `useModal`, `useTabs`, `useAccordion` |
| `useCallback` | All hook return values for referential stability |
| `useMemo` | Context value objects in `Tabs.Root`, `Accordion.Root`, `Accordion.Item` |
| Context API | Shared implicit state between compound sub-components |
| Compound Components | Modal, Tabs, Accordion |
| State colocation | State in Root, consumed by children via Context |
| Composition | Callers compose sub-components freely, no mega-props API |

---

## Accessibility Checklist

- All interactive elements reachable via keyboard only
- Focus trapped inside Modal when open
- Body scroll locked when Modal is open
- Escape closes Modal
- Arrow keys navigate Tabs and Accordion headers
- Roving tabindex on Tabs
- `aria-selected`, `aria-expanded`, `aria-controls`, `aria-labelledby` on all components
- Modal uses `role="dialog"` + `aria-modal="true"` rendered via Portal
- Accordion panels use `role="region"` + `aria-labelledby`
- `:focus-visible` ring visible on all focusable elements (box-shadow used where overflow clips outline)
