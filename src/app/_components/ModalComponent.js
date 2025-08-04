import React, {useEffect} from 'react'

const ModalComponent = ({onClose, isOpen, children}) => {

useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-white bg-opacity-10 flex items-center justify-center z-50">
      <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-md relative max-w-lg w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  )
}

export default ModalComponent
