import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import snackbarContext from '../../context/snackbarContext';
import snackbarActions from '../../actionType/snackbarActions';
import userContext from '../../context/userContext';
import userActions from '../../actionType/userActions';

const SocialLoginButton = (props) => {
    const [disabled, setDisabled] = useState('');
    const [popupOpened, setPopupOpened] = useState(false);
    const [popup, setPopup] = useState(null);
    const { dispatch: snackbarDispatch } = useContext(snackbarContext);
    const { dispatch: userDispatch} = useContext(userContext);
    const { provider, onSuccess, className, children, socket, apiUrl } = props;
        
    useEffect(() => {
        console.log("SOCKET REGISTRATION");
        socket.on(provider, obj => {
            setPopupOpened(false);
            if (obj.err){
                snackbarDispatch({
                    type: snackbarActions.SNACKBAR_SHOULD_SHOW,
                    payload: {
                        text: obj.err,
                        color: 'red'
                    }
                });
                return;
            }
            userDispatch({type: userActions.LOGIN_USER, payload: obj.user});
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