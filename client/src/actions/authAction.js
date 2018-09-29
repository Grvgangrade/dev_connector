import { ERROR_STATE , SET_CURRENT_USER , LOGOUT_USER} from './index';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthHeader from '../utils/setAuthHeader';


//To register user
export const registerAction = (userData , history) => dispatch => {
    axios.post('/api/users/register' , userData)
    .then(user => history.push('/login'))
    .catch(err => dispatch({
        type: ERROR_STATE,
        payload: err.response.data}));
}

//to login user
export const loginUser = userData => dispatch => {
    axios.post('/api/users/login' , userData)
    .then(res => {
            //get token
            const {token} = res.data;

            //Save token to localStorage
            localStorage.setItem('jwtToken' , token);

            //set token to authorization header
            setAuthHeader(token);

            //decode token
            const decoded = jwt_decode(token)

            console.log(decoded);

            //send user details to the auth state
            dispatch(setCurrentUser(decoded))
    })
    .catch(err => dispatch({
        type: ERROR_STATE,
        payload: err.response.data
    }));
}


export const setCurrentUser = decoded => {
    return ({
        type: SET_CURRENT_USER,
        payload: decoded
    })
}

//to logout user
export const logoutUser = () => {
    localStorage.removeItem('jwtToken')
    
    setAuthHeader(false);
    
    return ({
        type : LOGOUT_USER,
        payload : {}
    })
}