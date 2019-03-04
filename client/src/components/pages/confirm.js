import React, { useEffect,  useContext } from 'react';
import snackbarContext from '../../context/snackbarContext';
import snackbarActions from '../../actionType/snackbarActions';

const ConfirmPage = (props) => {
    const { dispatch: snackbarDispatch } = useContext(snackbarContext);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/email/confirm/${props.match.params.uuid}`)
            .then((res) => res.json()
            )
            .then((res) => {
                console.log("RESlog: ", res);
                snackbarDispatch({
                    type: snackbarActions.SNACKBAR_SHOULD_SHOW,
                    payload: {
                        text: res.msg,
                        color: 'black'
                    }
                })
                props.history.push('/');
            })
    }, [])
    return (
        <React.Fragment>
            <h1>CONFIRMING {props.match.params.uuid}</h1>
        </React.Fragment>
    );
}

export default ConfirmPage