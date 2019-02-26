import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from '../../context/userContext';
import userActions from '../../actionType/userActions';
import io from 'socket.io-client';

const SocialLoginButton = (props) => {
    const [disabled, setDisabled] = useState('');
    const [popupOpened, setPopupOpened] = useState(false);
    const [popup, setPopup] = useState(null);
    const [apiUrl] = useState(process.env.REACT_APP_API_URL);
    const [socket] = useState(io(apiUrl));
    const { dispatch } = useContext(Context);
    const { provider, onSuccess, className, children } = props;
        
    useEffect(() => {
        socket.on(provider, obj => {
            setPopupOpened(false);
            if (obj.err){
                alert(JSON.stringify(obj.err));
                return;
            }
            dispatch({type: userActions.LOGIN_USER, payload: obj.user});
            onSuccess();
        });
    }, []);

    useEffect(() => {
        if (!popupOpened && popup) {
            setDisabled('');
            popup.close();
        }
    });

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
            setPopup(openPopup());
            setPopupOpened(true);
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
    onSuccess: PropTypes.func
}

export default SocialLoginButton;