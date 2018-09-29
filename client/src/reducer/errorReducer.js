import {  ERROR_STATE } from '../actions';

const initialState = {};

const errorReducer = (state = initialState , action) => {
    switch(action.type){
        case ERROR_STATE : 
            return action.payload
        
        default: return state;
    }
}

export default errorReducer;