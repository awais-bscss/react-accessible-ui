# Modal Component

Accessible modal dialog built with the **Compound Component** pattern.

---

## Usage

```jsx
import { Modal } from './Modal';
import { useModal } from '../../hooks/useModal';

function Example() {
  const modal = useModal();

  return (
    <>
      <button onClick={modal.open}>Open Modal</button>

      <Modal.Root isOpen={modal.isOpen} onClose={modal.close} size="md">
        <Modal.Overlay>
          <Modal.Panel>
            <Modal.Header>
              <Modal.Title>Title</Modal.Title>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>Content goes here.</Modal.Body>
            <Modal.Footer>
              <button onClick={modal.close}>Close</button>
            </Modal.Footer>
          </Modal.Panel>
        </Modal.Overlay>
      </Modal.Root>
    </>
  );
}
```

---

## API

| Sub-component | Props | Description |
|---------------|-------|-------------|
| `Modal.Root` | `isOpen`, `onClose`, `size` (`sm` / `md` / `lg`) | State owner. Locks body scroll, listens for Escape. |
| `Modal.Overlay` | none | Full-screen backdrop. Click outside closes modal. |
| `Modal.Panel` | none | Dialog box. Traps focus. `role="dialog"` + `aria-modal`. |
| `Modal.Header` | none | Header row layout. |
| `Modal.Title` | none | `<h2>` linked to panel via `aria-labelledby`. |
| `Modal.Close` | `label` | Close button with `aria-label`. |
| `Modal.Body` | none | Scrollable content area. |
| `Modal.Footer` | none | Action buttons row. |

---

## Hooks Used

| Hook | Purpose |
|------|---------|
| `useModal` | Owns `isOpen` state, exposes `open` / `close` |
| `useFocusTrap` | Traps Tab / Shift+Tab inside the panel |
| `useKeyboard` | Closes modal on Escape key |

---

## Keyboard Support

| Key | Action |
|-----|--------|
| `Escape` | Close modal |
| `Tab` | Move focus forward (trapped inside panel) |
| `Shift + Tab` | Move focus backward (trapped inside panel) |

---

## ARIA

- `role="dialog"` + `aria-modal="true"` on the panel
- `aria-labelledby` links the panel to its title
- Rendered via React Portal into `#modal-root`
- Body scroll locked (`overflow: hidden`) while open
