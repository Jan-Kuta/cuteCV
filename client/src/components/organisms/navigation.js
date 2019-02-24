import React, { useState, useGlobal } from 'reactn';
import { Link } from "react-router-dom";
import { useQuery } from 'react-apollo-hooks';
import LoginModal from './loginModal';
import RegisterModal from './registerModal';
import ForgotPasswordModal from './forgotPassword';
import { MeQuery } from '../../queries';

const Navigation = (props) => {
    const getUserName = (user) => (
        user.displayName
    );

    const { data } = useQuery(MeQuery);
    const [loginModalOpened, setLoginModalOpened] = useState(false);
    const [registerModalOpened, setRegisterModalOpened] = useState(false);
    const [forgotPasswordModalOpened, setForgotPasswordModalOpened] = useState(false);
    const [user, setUser] = useGlobal('user');
    const isAuthenticated = !!user;
    const loggedUser = isAuthenticated ? getUserName(user) : 'UNKNOWN';
    
    if (data.me && data.me.username !== (user ? user.username : null)) {
        setUser(data.me);
    }
    const logout = async () => {
        setUser(null);
        const res = await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
            method: 'GET',
            credentials: 'include'
        });
        console.log('logout', res);
    };

    return (
        <React.Fragment>
            <div className="w3-top">
                <nav className="w3-bar w3-dark-grey">
                    <Link to="/" className="w3-bar-item w3-button w3-black">Next CV</Link>
                    <Link to="/cv" className="w3-bar-item w3-button">CV</Link>
                    <div>
                        {isAuthenticated && (
                            <span>
                                <span className="w3-bar-item w3-button w3-right" onClick={logout}>Log Out</span>
                                <span className="w3-bar-item w3-right">Hello, {loggedUser}</span>
                            </span>
                        )}
                        {!isAuthenticated && (
                            <span>
                                <div onClick={() => setLoginModalOpened(true)}><a className="w3-bar-item w3-button w3-right">Log in</a></div>
                                <div onClick={() => setRegisterModalOpened(true)}><a className="w3-bar-item w3-button w3-right">Register</a></div>
                            </span>
                        )}
                    </div>
                </nav>
            </div>
            <div className="nav-filler" />
            <LoginModal
                onClose={() => setLoginModalOpened(false)}
                onRegisterClick={() => {
                    setLoginModalOpened(false);
                    setRegisterModalOpened(true);
                }}
                onForgotPasswordClick={() => {
                    setLoginModalOpened(false);
                    setForgotPasswordModalOpened(true);
                }}
                opened={loginModalOpened}
                onSuccess={() => {
                    setLoginModalOpened(false);
                    setRegisterModalOpened(false);
                    setForgotPasswordModalOpened(false);
                }}
            />
            <RegisterModal
                onClose={() => setRegisterModalOpened(false)}
                onSubmit={() => alert("OK")}
                onLoginClick={() => {
                    setLoginModalOpened(true);
                    setRegisterModalOpened(false);
                }}
                opened={registerModalOpened}
                onSuccess={() => {
                    setLoginModalOpened(false);
                    setRegisterModalOpened(false);
                    setForgotPasswordModalOpened(false);
                }}
            />
            <ForgotPasswordModal
                onClose={() => setForgotPasswordModalOpened(false)}
                onSubmit={() => alert("OK")}
                onRegisterClick={() => {
                    setForgotPasswordModalOpened(false);
                    setRegisterModalOpened(true);
                }}
                onLoginClick={() => {
                    setLoginModalOpened(true);
                    setForgotPasswordModalOpened(false);
                }}
                opened={forgotPasswordModalOpened}
            />
        </React.Fragment>
    );
}

export default Navigation;
