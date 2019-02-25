import React from 'react';
import SocialLoginButton from './socialLoginBtn';

const GoogleLoginButton = (props) => {
    const { onSuccess } = props;

    return (
        <SocialLoginButton className="w3-red w3-block" onSuccess={onSuccess} provider="google">
            <i className = "fa fa-google fa-fw" > </i> Google
        </SocialLoginButton>
    );
}

export default GoogleLoginButton;
