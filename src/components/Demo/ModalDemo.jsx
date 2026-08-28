import { useModal } from '../../hooks/useModal';
import { Modal } from '../Modal/Modal';
import { Section } from './Section';

export function ModalDemo() {
  const confirmModal = useModal();
  const infoModal = useModal();
  const formModal = useModal();

  const handleConfirm = () => {
    alert('Action confirmed!');
    confirmModal.close();
  };

  return (
    <>
      <Section
        tag="01 Modal"
        title="Modal Dialog"
        desc='Three variants. Every modal traps focus, closes on Escape or overlay click, and uses role="dialog" + aria-labelledby.'
      >
        <div className="card">
          <div className="demo-row">
            <button
              id="open-info-modal"
              className="btn btn--primary"
              onClick={infoModal.open}
            >
              Info Modal
            </button>
            <button
              id="open-confirm-modal"
              className="btn btn--outline"
              onClick={confirmModal.open}
            >
              Confirm Modal
            </button>
            <button
              id="open-form-modal"
              className="btn btn--ghost"
              onClick={formModal.open}
            >
              Form Modal
            </button>
          </div>
        </div>
      </Section>

      <Modal.Root isOpen={infoModal.isOpen} onClose={infoModal.close} size="md">
        <Modal.Overlay>
          <Modal.Panel>
            <Modal.Header>
              <Modal.Title>React Rendering Model</Modal.Title>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>
              <div className="modal-demo-content">
                <p>
                  React builds a <strong>Virtual DOM</strong>, a lightweight
                  JavaScript representation of the real DOM. When state changes,
                  React re-renders the component into a new Virtual DOM tree.
                </p>
                <p>
                  It then <strong>reconciles</strong> the old and new trees to
                  find the minimal set of real DOM mutations needed. This is
                  what makes React fast.
                </p>
                <p>
                  <strong>Keys</strong> help reconciliation identify which list
                  items moved, were added, or were removed.
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn--primary btn--sm" onClick={infoModal.close}>
                Got it
              </button>
            </Modal.Footer>
          </Modal.Panel>
        </Modal.Overlay>
      </Modal.Root>

      <Modal.Root isOpen={confirmModal.isOpen} onClose={confirmModal.close} size="sm">
        <Modal.Overlay>
          <Modal.Panel>
            <Modal.Header>
              <Modal.Title>Confirm Action</Modal.Title>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to proceed? This action cannot be undone.
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn--ghost btn--sm" onClick={confirmModal.close}>
                Cancel
              </button>
              <button className="btn btn--danger btn--sm" onClick={handleConfirm}>
                Confirm
              </button>
            </Modal.Footer>
          </Modal.Panel>
        </Modal.Overlay>
      </Modal.Root>

      <Modal.Root isOpen={formModal.isOpen} onClose={formModal.close} size="md">
        <Modal.Overlay>
          <Modal.Panel>
            <Modal.Header>
              <Modal.Title>Send Feedback</Modal.Title>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>
              <form
                style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
                onSubmit={(e) => { e.preventDefault(); alert('Submitted!'); formModal.close(); }}
              >
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: '#6b4a4a' }}>
                  Name
                  <input
                    id="form-modal-name"
                    type="text"
                    placeholder="Your name"
                    style={{
                      background: '#f5f0f0',
                      border: '1px solid #d4c8c8',
                      borderRadius: '6px',
                      color: '#1a0a0a',
                      padding: '9px 12px',
                      fontSize: '0.875rem',
                      fontFamily: 'inherit',
                    }}
                  />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: '#6b4a4a' }}>
                  Message
                  <textarea
                    id="form-modal-msg"
                    rows={4}
                    placeholder="Write your feedback..."
                    style={{
                      background: '#f5f0f0',
                      border: '1px solid #d4c8c8',
                      borderRadius: '6px',
                      color: '#1a0a0a',
                      padding: '9px 12px',
                      fontSize: '0.875rem',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                    }}
                  />
                </label>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', borderTop: '1px solid #d4c8c8', paddingTop: '14px' }}>
                  <button type="button" className="btn btn--ghost btn--sm" onClick={formModal.close}>Cancel</button>
                  <button type="submit" className="btn btn--primary btn--sm">Submit</button>
                </div>
              </form>
            </Modal.Body>
          </Modal.Panel>
        </Modal.Overlay>
      </Modal.Root>
    </>
  );
}
