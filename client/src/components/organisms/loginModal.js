import React, { useState, useContext } from 'react';
import Modal from '../atoms/modal';
import FacebookLoginButton from '../atoms/facebookLoginBtn';
import TwitterLoginButton from '../atoms/twitterLoginBtn';
import GoogleLoginButton from '../atoms/googleLoginBtn';
import Alert from '../atoms/alert';
import Context from '../../context/userContext';
import userActions from '../../actionType/userActions';

const LoginModal = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { state: { userErrorMessage }, dispatch } = useContext(Context);
    const { onClose, opened, onRegisterClick, onForgotPasswordClick, onSuccess, socket, apiUrl } = props;

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        try{
            let res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': process.env.REACT_APP_API_URL
                },
                body: JSON.stringify({username: email, password: password})
            });
            if (!res.ok){
                res = await res.json();
                dispatch({type: userActions.SHOW_USER_ERROR, payload: res.message});
                return;
            }
            res = await res.json();
            console.log("user: ", res);
            dispatch({type: userActions.LOGIN_USER, payload: res});
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
                    <div className="w3-col m6 s12">
                        <a className="w3-button w3-block" onClick={onRegisterClick}>Register</a>
                    </div>
                    <div className="w3-col m6 s12">
                        <a className="w3-button w3-block" onClick={onForgotPasswordClick}>Forgot password?</a>
                    </div>
                </div>
            )}
        >
            <form onSubmit={onSubmit}>
                <h2>Login</h2>
                {userErrorMessage && (
                    <Alert onClose={() => dispatch({type: userActions.HIDE_USER_ERROR})}>
                        <p>{userErrorMessage}</p>
                    </Alert>
                )}
                <div className="w3-row">
                    <div className="w3-col m5 s12">
                        <FacebookLoginButton onSuccess={onSuccess} socket={socket} apiUrl={apiUrl} />
                        <TwitterLoginButton onSuccess={onSuccess} socket={socket} apiUrl={apiUrl} />
                        <GoogleLoginButton onSuccess={onSuccess} socket={socket} apiUrl={apiUrl} />
                    </div>
                    <div className="w3-col m2 s12">
                        <div className="vl w3-hide-small">
                            <span className="vl-innertext">or</span>
                        </div>
                        <span className="w3-hide-medium w3-hide-large">
                            Or sign in manually:
                        </span>&nbsp;
                    </div>
                    <div className="w3-col m5 s12">
                        <input className="w3-input w3-round w3-border-0 w3-section" type="email" name="email" placeholder="E-mail" value={email} onChange={handleChangeEmail} required />
                        <input className="w3-input w3-round w3-border-0 w3-section" type="password" name="password" placeholder="Password" value={password} onChange={handleChangePassword} required />
                        {/* <input name="remember" type="checkbox" checked={true} /> Remember me */}
                        <input className="w3-button w3-round w3-block w3-green w3-section" type="submit" value="Login" />
                    </div>
                </div>
            </form>
        </Modal>
    );
}

export default LoginModal;
