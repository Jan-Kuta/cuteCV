import snackbarActions from '../actionType/snackbarActions';

export default (state, action) => {
    switch(action.type) {
        case snackbarActions.SNACKBAR_SHOULD_SHOW: 
            return {
                color: action.payload.color, // see https://www.w3schools.com/w3css/w3css_colors.asp
                text: action.payload.text,
                children: action.payload.children,
                hideTime: action.payload.hideTime,
                showTime: Date.now()
            };
        default:
            return state;
    }
}