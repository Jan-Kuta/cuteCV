import React, { useContext } from 'react';
import Context from '../../context';

const WelcomePage = (props) => {
    const { state: { user } } = useContext(Context);
    
    return (
        <React.Fragment>
            <h1>Welcome {user? user.displayName : null}</h1>
            {JSON.stringify(user)}
        </React.Fragment>
    );
}

export default WelcomePage