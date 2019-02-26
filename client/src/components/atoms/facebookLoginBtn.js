import React from 'react';
import SocialLoginButton from './socialLoginBtn';

const FacebookLoginButton = (props) => {
    const { onSuccess, socket, apiUrl } = props;
    
    return ( 
        <SocialLoginButton className="w3-indigo w3-block" onSuccess={onSuccess} provider="facebook" socket={socket} apiUrl={apiUrl}>
            <i className = "fa fa-facebook fa-fw" > </i> Facebook
        </SocialLoginButton>                        
    )
}

export default FacebookLoginButton;
