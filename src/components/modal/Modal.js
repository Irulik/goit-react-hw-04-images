import React, { useEffect } from 'react';
import { Overlay, ModalWrapper } from './Modal.styled';

const Modal = ({ src, alt, handleClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose]);

  return (
    <Overlay onClick={handleClose}>
      <ModalWrapper>
        <img src={src} alt={alt} />
      </ModalWrapper>
    </Overlay>
  );
};

export default Modal;