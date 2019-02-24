import React from 'reactn';

const Modal = (props) => ( 
    <div className="w3-modal" style={{display: props.opened ? "block" : "none" }}>
        <div className="w3-modal-content w3-animate-zoom">
            <div className="w3-container w3-light-grey">
                <span
                    onClick={props.onClose} 
                    className="w3-button w3-xlarge w3-hover-red w3-display-topright"
                    title="Close Modal"
                >
                    &times;
                </span>

                <div className="w3-padding">
                    {props.children} 
                </div>
            </div>
            <footer>{props.footer}</footer>
        </div>
    </div>
);

export default Modal;
