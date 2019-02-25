import React from 'react';
import SocialLoginButton from './socialLoginBtn';

const TwitterLoginButton = (props) => {
    const { onSuccess } = props;
    
    return (
        <SocialLoginButton className="w3-blue w3-block" onSuccess={onSuccess} provider="twitter">
            <i className = "fa fa-twitter fa-fw" > </i> Twitter
        </SocialLoginButton>
    );
}

export default TwitterLoginButton;
