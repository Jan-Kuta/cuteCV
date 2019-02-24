import React from 'reactn';
import SocialLoginButton from './socialLoginBtn';
import io from 'socket.io-client';
const apiUrl = process.env.REACT_APP_API_URL; 
const socket = io(apiUrl);

const GoogleLoginButton = (props) => {
    const { onSuccess } = props;

    return (
        <SocialLoginButton className="w3-red w3-block" onSuccess={onSuccess} provider="google" socket={socket} apiUrl={apiUrl}>
            <i className = "fa fa-google fa-fw" > </i> Google
        </SocialLoginButton>
    );
}

export default GoogleLoginButton;
