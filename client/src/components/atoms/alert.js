import React from 'react';

const Alert = ({ children, onClose }) => {
    return (
        <div className="w3-panel w3-red w3-display-container">
            <span onClick={onClose} className="w3-button w3-large w3-display-topright">×</span>
            {children}
        </div>
    );
}

export default Alert;