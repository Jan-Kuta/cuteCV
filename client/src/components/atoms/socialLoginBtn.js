import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from '../../context';

const SocialLoginButton = (props) => {
    const [disabled, setDisabled] = useState('');
    const { socket, provider, onSuccess, apiUrl, className, children } = props;
    const { dispatch } = useContext(Context);
        
    useEffect(() => {
        socket.on(provider, user => {
            //console.log(popup);
            console.log('user', user)
            //popup && popup.close();
            dispatch({type: 'LOGIN_USER', payload: user});
            onSuccess();
        });
    }, []);

    const checkPopup = (popup) => {
        const check = setInterval(() => {
            if (!popup || popup.closed || popup.closed === undefined) {
                clearInterval(check)
                setDisabled('');
            }
        }, 1000)
    };

    const openPopup = () => {
        const width = 600,
            height = 600
        const left = (window.innerWidth / 2) - (width / 2)
        const top = (window.innerHeight / 2) - (height / 2)
        const url = `${apiUrl}/${provider}?socketId=${socket.id}`

        return window.open(url, '',
            `toolbar=no, location=no, directories=no, status=no, menubar=no, 
          scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
          height=${height}, top=${top}, left=${left}`
        )
    }

    const startAuth = async () => {
        if (!disabled) {
            const myPopup = openPopup();
            console.log("popup: ", myPopup);
            checkPopup(myPopup)
            setDisabled('disabled')
        }
    }

    return ( 
        <a
            className = {`w3-button w3-round w3-section${disabled ? ' w3-disabled' : ''}${className ? ' ' + className : ''}`}
            onClick = {startAuth}
        >
            {children}
        </a>
    );
}

SocialLoginButton.propTypes = {
    provider: PropTypes.string.isRequired,
    socket: PropTypes.object.isRequired,
    apiUrl: PropTypes.string.isRequired,
    onSuccess: PropTypes.func
}

export default SocialLoginButton;