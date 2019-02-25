import userActions from '../actionType/userActions';

export default (state, action) => {
    switch(action.type) {
        case userActions.LOGIN_USER: 
            return {
                ...state,
                user: action.payload
            };
            break;
        case userActions.LOGOUT_USER: 
            return {
                ...state,
                user: null
            };
            break;
        default:
            return state;
    }
}