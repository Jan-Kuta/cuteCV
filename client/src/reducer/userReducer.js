import userActions from '../actionType/userActions';

export default (state, action) => {
    switch(action.type) {
        case userActions.LOGIN_USER: 
            return {
                ...state,
                user: action.payload
            };
        case userActions.LOGOUT_USER: 
            return {
                ...state,
                user: null
            };
        case userActions.SHOW_USER_ERROR:
            return {
                ...state,
                userErrorMessage: action.payload
            };
        case userActions.HIDE_USER_ERROR:
            return {
                ...state,
                userErrorMessage: null
            }
        default:
            return state;
    }
}