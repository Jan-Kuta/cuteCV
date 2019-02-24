import React from 'reactn';
import SocialLoginButton from './socialLoginBtn';
import io from 'socket.io-client';
const apiUrl = process.env.REACT_APP_API_URL;
const socket = io(apiUrl);

const TwitterLoginButton = (props) => {
    const { onSuccess } = props;
    
    return (
        <SocialLoginButton className="w3-blue w3-block" onSuccess={onSuccess} provider="twitter" socket={socket} apiUrl={apiUrl}>
            <i className = "fa fa-twitter fa-fw" > </i> Twitter
        </SocialLoginButton>
    );
}

export default TwitterLoginButton;
