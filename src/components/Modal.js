import React, { useRef } from 'react';
import '../css/Modal.css';

const Modal = ({ toggleModalVisibility }) => {
  const modalContentRef = useRef();

  const handleClickOutside = (event) => {
    if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
      toggleModalVisibility();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-content" ref={modalContentRef}>
      {/*
        <h2>content</h2>
        <p>content.</p>
        
        <button onClick={toggleModalVisibility} className="modal-close-button">
          Close
        </button>
        */}
      </div>
    </div>
  );
};

export default Modal;