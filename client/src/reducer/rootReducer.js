import { combineReducers } from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';

const rootReducer = combineReducers({
    auth : authReducer,
    errors : errorReducer,
    profile : profileReducer,
    posts : postReducer
})

export default rootReducer;