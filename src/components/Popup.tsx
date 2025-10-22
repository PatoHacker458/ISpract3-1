import React from 'react';

interface PopupProps {
  title: string;
  message: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ title, message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        {}
        <span className="close-btn" onClick={onClose}>&times;</span>
        <div className="popup-content">
          <h2 id="popup-title">{title}</h2>
          <p id="popup-message">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Popup;