import React from 'reactn';
import Modal from '../atoms/modal';

const ForgotPasswordModal = (props) => (
    <Modal
        onClose={props.onClose}
        opened={props.opened}
        footer={(
            <div className="w3-row w3-dark-grey">
                <div className="w3-col m6 s12">
                    <a className="w3-button w3-block" onClick={props.onRegisterClick}>Register</a>
                </div>
                <div className="w3-col m6 s12">
                    <a className="w3-button w3-block" onClick={props.onLoginClick}>Login</a>
                </div>
            </div>
        )}
    >
        <form onSubmit={props.onSubmit}>
            <h2>Forgot passvord</h2>
            <div className="w3-row">
                <div className="w3-col s12">
                    <p>Set your registration e-mail</p>
                    <input className="w3-input w3-round w3-border-0 w3-section" type="email" name="email" placeholder="E-mail" required />
                    <input className="w3-button w3-round w3-block w3-green w3-section" type="submit" value="Send reset password e-mail" />
                </div>          
            </div>
        </form>
    </Modal>
);

export default ForgotPasswordModal;
