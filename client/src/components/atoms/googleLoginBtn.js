import React from 'react';
import SocialLoginButton from './socialLoginBtn';

const GoogleLoginButton = (props) => {
    const { onSuccess, socket, apiUrl } = props;

    return (
        <SocialLoginButton className="w3-red w3-block" onSuccess={onSuccess} provider="google" socket={socket} apiUrl={apiUrl}>
            <i className = "fa fa-google fa-fw" > </i> Google
        </SocialLoginButton>
    );
}

export default GoogleLoginButton;
