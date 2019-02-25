import React, { useContext } from 'react';
import Context from '../../context';

const WelcomePage = (props) => {
    const { state: { user } } = useContext(Context);
    
    return (
        <React.Fragment>
            {user && <img src={user.photoUrl ? user.photoUrl : 'http://simpleicon.com/wp-content/uploads/user-4.png'} alt={user.displayName} />}
            <h1>Welcome {user? user.displayName : null}</h1>
            {JSON.stringify(user)}
        </React.Fragment>
    );
}

export default WelcomePage