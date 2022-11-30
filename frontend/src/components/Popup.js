import { useEffect } from 'react';

function Popup({ isOpen, onClose, type, name, children }) {
  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleEscClose(e) {
    if (e.key === 'Escape') {
      onClose();
    }
  }

  function handleOverlayClick(e) {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }
  return (
    <div
      className={`popup popup_content_${name} ${isOpen ? 'popup_opened' : ''}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`popup__container popup__container_type_${type} popup__container_content_${name}`}
      >
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        {children}
      </div>
    </div>
  );
}
export default Popup;
