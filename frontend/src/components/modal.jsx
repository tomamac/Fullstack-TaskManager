import { useEffect, useRef } from "react";
import "../styles/modal.css";

function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal" ref={modalRef}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
