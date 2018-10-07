import {  ERROR_STATE , CLEAR_ERRORS } from '../actions';

const initialState = {};

const errorReducer = (state = initialState , action) => {
    switch(action.type){
        case ERROR_STATE : 
            return action.payload
            
        case CLEAR_ERRORS :
            return {};
        
        default: return state;
    }
}

export default errorReducer;