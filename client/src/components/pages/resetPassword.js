import React, { useState,  useContext } from 'react';
import snackbarContext from '../../context/snackbarContext';
import snackbarActions from '../../actionType/snackbarActions';

const ResetPasswordPage = (props) => {
    const { dispatch: snackbarDispatch } = useContext(snackbarContext);
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleChangeConfirmedPassword = (e) => {
        setConfirmedPassword(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmedPassword) {
            snackbarDispatch({
                type: snackbarActions.SNACKBAR_SHOULD_SHOW,
                payload: {
                    text: 'Passwords do not match',
                    color: 'red'
                }
            });
            return
        }

        let result = await fetch(`${process.env.REACT_APP_API_URL}/reset-password`,{
            method: 'post',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': process.env.REACT_APP_API_URL
            },
            body: JSON.stringify({
                password,
                uuid: props.match.params.uuid
            })
        });

        console.log("result: ",result);
        if (!result.ok){
            snackbarDispatch({
                type: snackbarActions.SNACKBAR_SHOULD_SHOW,
                payload: {
                    text: 'Reset password not successfull',
                    color: 'red'
                }
            });
            return;
        }
        
        snackbarDispatch({
            type: snackbarActions.SNACKBAR_SHOULD_SHOW,
            payload: {
                text: 'Password changed',
                color: 'green'
            }
        });
        
        props.history.push('/');   
    }

    return (
        <React.Fragment>
            <form className="w3-light-grey w3-padding" onSubmit={onSubmit}>
                <h2>Reset password</h2>
                <div className="w3-row">
                    <div className="w3-col s12">
                        <input className="w3-input w3-round w3-border-0 w3-section" type="password" name="password" placeholder="Password" value={password} onChange={handleChangePassword} required />
                        <input className="w3-input w3-round w3-border-0 w3-section" type="password" name="repeatPassword" placeholder="Repeat password" value={confirmedPassword} onChange={handleChangeConfirmedPassword} required />
                        <input className="w3-button w3-round w3-block w3-green w3-section" type="submit" value="Change Password" />
                    </div>             
                </div>
            </form>
        </React.Fragment>
    );
}

export default ResetPasswordPage;