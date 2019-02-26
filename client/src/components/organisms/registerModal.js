import React, { useState, useContext } from 'react';
import Modal from '../atoms/modal';
import FacebookLoginButton from '../atoms/facebookLoginBtn';
import TwitterLoginButton from '../atoms/twitterLoginBtn';
import GoogleLoginButton from '../atoms/googleLoginBtn';
import Alert from '../atoms/alert';
import Context from '../../context/userContext';
import userActions from '../../actionType/userActions';


const RegisterModal = (props) => {
    const { onClose, opened, onLoginClick, onSuccess, socket, apiUrl } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [username, setUsername] = useState('');
    const { state: { userErrorMessage }, dispatch } = useContext(Context);

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleChangeConfirmedPassword = (e) => {
        setConfirmedPassword(e.target.value);
    }

    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            if (password !== confirmedPassword) {
                dispatch({type: userActions.SHOW_USER_ERROR, payload: 'Passwords do not match'});
                return
            }

            let res = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': process.env.REACT_APP_API_URL
                },
                body: JSON.stringify({username, email, password })
            });
            if (!res.ok){
                res = await res.json();
                dispatch({type: userActions.SHOW_USER_ERROR, payload: res.message});
                return;
            }
            alert('Registration completed, check your e-mail.')
            onSuccess();
        } catch (err) {
            dispatch({type: userActions.SHOW_USER_ERROR, payload: 'Problem with server'});
        }
    }    

    return (
        <Modal
            onClose={onClose}
            opened={opened}
            footer={(
                <div className="w3-row w3-dark-grey">
                    <div className="w3-col s12">
                        <a className="w3-button w3-block" onClick={onLoginClick}>Login</a>
                    </div>
                </div>
            )}
        >
            <form onSubmit={onSubmit}>
                <h2>Register</h2>
                {userErrorMessage && (
                    <Alert onClose={() => dispatch({type: userActions.HIDE_USER_ERROR})}>
                        <p>{userErrorMessage}</p>
                    </Alert>
                )}
                <div className="w3-row">
                    <div className="w3-col s12">
                        <input className="w3-input w3-round w3-border-0 w3-section" type="email" name="email" placeholder="E-mail" value={email} onChange={handleChangeEmail} required />
                        <input className="w3-input w3-round w3-border-0 w3-section" type="text" name="username" placeholder="Username" value={username} onChange={handleChangeUsername} required />
                        <input className="w3-input w3-round w3-border-0 w3-section" type="password" name="password" placeholder="Password" value={password} onChange={handleChangePassword} required />
                        <input className="w3-input w3-round w3-border-0 w3-section" type="password" name="repeatPassword" placeholder="Repeat password" value={confirmedPassword} onChange={handleChangeConfirmedPassword} required />
                        <input className="w3-button w3-round w3-block w3-green w3-section" type="submit" value="Register" />
                    </div>
                    <div className="w3-col s12 w3-center">
                        <span>
                            Or use
                        </span>
                    </div>
                    <div className="w3-col s12">
                        <FacebookLoginButton onSuccess={onSuccess} socket={socket} apiUrl={apiUrl} />
                        <TwitterLoginButton onSuccess={onSuccess} socket={socket} apiUrl={apiUrl} />
                        <GoogleLoginButton onSuccess={onSuccess} socket={socket} apiUrl={apiUrl} />
                    </div>                
                </div>
            </form>
        </Modal>
    );
};

export default RegisterModal;
