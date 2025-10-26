import type { PopupInfo } from '../models/PopupInfo';
import React from 'react';

interface PopupProps extends PopupInfo{
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ title, message, onClose }) => {
  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
        className="popup-overlay" 
        onClick={onClose}
        role="alertdialog" 
        aria-modal="true" 
    >
      <div 
          className="popup-container popup-error" 
          onClick={handleContainerClick}
      >
        <button 
            className="close-btn" 
            onClick={onClose}
            aria-label="Cerrar mensaje de error"
        >
            &times;
        </button>
        
        <div className="popup-content">
          <div className="error-icon">⚠️</div> 
          
          <h2 id="popup-title">{title}</h2>
          <p id="popup-message">{message}</p>
          
          <button className="confirm-btn" onClick={onClose}>
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;