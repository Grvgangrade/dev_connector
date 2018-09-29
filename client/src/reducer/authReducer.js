import { REGISTER_USER , SET_CURRENT_USER , LOGOUT_USER } from '../actions';
import isEmpty from '../validations/isEmpty';

const initialState = {
    isAuthenticated: false,
    user: {}
};

const authReducer = (state = initialState , action) => {
    switch(action.type){
        case REGISTER_USER :
            return({
                ...state,
                user: action.userData
            })
            
        case SET_CURRENT_USER :
            return ({
                ...state,
                isAuthenticated : !isEmpty(action.payload),
                user : action.payload
            })
            
        case LOGOUT_USER :
        return ({
            ...state,
            isAuthenticated : !isEmpty(action.payload),
            user : action.payload
        })
            
        default: return state;
    }
}

export default authReducer;