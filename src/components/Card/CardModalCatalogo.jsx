// Modal.jsx
import React from 'react';

const Modal = ({ isOpen, onClose, title, description }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-5 w-[90%] max-w-md">
        <h1 className="text-lg font-bold">{title}</h1>
        <p className="mt-2">{description}</p>
        <button 
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded" 
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
