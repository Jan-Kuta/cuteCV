import React from 'reactn';
import SocialLoginButton from './socialLoginBtn';
import io from 'socket.io-client';
const apiUrl = process.env.REACT_APP_API_URL; 
const socket = io(apiUrl);

const FacebookLoginButton = (props) => {
    const { onSuccess } = props;
    
    return ( 
        <SocialLoginButton className="w3-indigo w3-block" onSuccess={onSuccess} provider="facebook" socket={socket} apiUrl={apiUrl}>
            <i className = "fa fa-facebook fa-fw" > </i> Facebook
        </SocialLoginButton>                        
    )
}

export default FacebookLoginButton;
