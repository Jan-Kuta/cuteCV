import React, { useGlobal } from 'reactn';

const WelcomePage = (props) => {
    const { users } = props;
    const [ user, setUser ] = useGlobal('user');
    
    return (
        <React.Fragment>
            <h1>Welcome {user? user.displayName : null}</h1>
            {users && users.map((user, index) => (
                <h4 key={index}>{`${user.email}: ${user.username}`}</h4>
            ))}
            {JSON.stringify(user)}
        </React.Fragment>
    );
}

export default WelcomePage