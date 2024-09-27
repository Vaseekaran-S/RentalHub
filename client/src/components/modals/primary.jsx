import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-lg w-full max-w-lg">
        <button className="float-right text-red-600" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
