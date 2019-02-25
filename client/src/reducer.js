export default (state, action) => {
    switch(action.type) {
        case 'LOGIN_USER': 
            return {
                ...state,
                user: action.payload
            };
            break;
        case 'LOGOUT_USER': 
            return {
                ...state,
                user: null
            };
            break;
        default:
            return state;
    }
}