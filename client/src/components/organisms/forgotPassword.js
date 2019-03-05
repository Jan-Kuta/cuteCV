import React, { useState, useContext } from 'react';
import SnackbarContext from '../../context/snackbarContext';
import snackbarActions from '../../actionType/snackbarActions';
import Modal from '../atoms/modal';

const ForgotPasswordModal = (props) => {
    const [email, setEmail] = useState("");
    const { dispatch: snackbarDispatch} = useContext(SnackbarContext);
    const { onSuccess } = props;

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        try{
            let res = await fetch(`${process.env.REACT_APP_API_URL}/forgot-password`, {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': process.env.REACT_APP_API_URL
                },
                body: JSON.stringify({email})
            });
            if (!res.ok){
                res = await res.json();
                snackbarDispatch({
                    type: snackbarActions.SNACKBAR_SHOULD_SHOW,
                    payload: {
                        text: res.message,
                        color: 'red'
                    }
                });
                return;
            }
            
            snackbarDispatch({
                type: snackbarActions.SNACKBAR_SHOULD_SHOW,
                payload: {
                    text: 'Check your e-mail to reset password',
                    color: 'green'
                }
            });
            onSuccess();
        } catch (err) {
            snackbarDispatch({
                type: snackbarActions.SNACKBAR_SHOULD_SHOW,
                payload: {
                    text: 'Problem with server',
                    color: 'red'
                }
            });
        }
    }    
    
    return (
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
            <form onSubmit={onSubmit}>
                <h2>Forgot passvord</h2>
                <div className="w3-row">
                    <div className="w3-col s12">
                        <p>Set your registration e-mail</p>
                        <input className="w3-input w3-round w3-border-0 w3-section" type="email" name="email" placeholder="E-mail" value={email} onChange={handleChangeEmail} required />
                        <input className="w3-button w3-round w3-block w3-green w3-section" type="submit" value="Send reset password e-mail" />
                    </div>          
                </div>
            </form>
        </Modal>
    );
}

export default ForgotPasswordModal;
