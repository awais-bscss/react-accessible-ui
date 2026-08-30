import { createContext, useContext, useId, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useKeyboard }  from '../../hooks/useKeyboard';

const ModalContext = createContext(null);

function useModalContext() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('Modal sub-components must be used inside <Modal.Root>');
  return ctx;
}

function Root({ isOpen, onClose, size = 'md', children }) {
  const titleId = useId();
  const ctx = useMemo(() => ({ onClose, titleId, size }), [onClose, titleId, size]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useKeyboard({ Escape: onClose }, isOpen);

  if (!isOpen) return null;

  return (
    <ModalContext.Provider value={ctx}>
      {children}
    </ModalContext.Provider>
  );
}

function Overlay({ children }) {
  const { onClose } = useModalContext();

  return createPortal(
    <div
      className="modal-overlay"
      role="presentation"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {children}
    </div>,
    document.getElementById('modal-root')
  );
}

function Panel({ children }) {
  const { titleId, size } = useModalContext();
  const panelRef = useFocusTrap(true);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={`modal-panel modal-panel--${size}`}
      tabIndex={-1}
    >
      {children}
    </div>
  );
}

function Header({ children }) {
  return <div className="modal-header">{children}</div>;
}

function Title({ children }) {
  const { titleId } = useModalContext();
  return <h2 id={titleId} className="modal-title">{children}</h2>;
}

function Close({ label = 'Close dialog' }) {
  const { onClose } = useModalContext();
  return (
    <button className="modal-close" onClick={onClose} aria-label={label} type="button">
      ✕
    </button>
  );
}

function Body({ children }) {
  return <div className="modal-body">{children}</div>;
}

function Footer({ children }) {
  return <div className="modal-footer">{children}</div>;
}

export const Modal = { Root, Overlay, Panel, Header, Title, Close, Body, Footer };
