import React, { useEffect, useContext, useState } from 'react';
import Context from '../../context/snackbarContext';

const Snackbar = () => {
    const { state: { color, text, children, showTime, hideTime }} = useContext(Context);
    const [timeout, setTimeoutState] = useState(null);
    const [visible, setVisible] = useState(false);

    useEffect(
        () => {
            if (!showTime) {
                return;
            }

            if (timeout) {
                clearTimeout(timeout);
            }        

            setVisible(true);
            setTimeoutState(setTimeout(
                () => {
                    setVisible(false)
                },
                hideTime ? hideTime : Snackbar.statics.DEFAULT_HIDE_TIME
            ));
        }, [showTime]
    );
    
    return (
        <div className={`w3-panel w3-snackbar w3-${color ? color : Snackbar.statics.DEFAULT_COLOR} w3-top w3-animate-top${visible ? '' : ' w3-hide'}`}>
            <p>{text}</p>
            {children}
        </div>
    );
}

Snackbar.statics = {
    DEFAULT_HIDE_TIME: 5000,
    DEFAULT_COLOR: 'black'
}

export default Snackbar;