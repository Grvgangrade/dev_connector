import { GET_POST , ADD_POST , ADD_POSTS , ERROR_STATE , SET_LOADING } from './index';
import axios from 'axios';


export const addPost = (postData) => dispatch => {
    dispatch(setLoading());
    axios.post('/api/posts' , postData).then(res => {
        dispatch({
            type: ADD_POST,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: ERROR_STATE,
            payload: err.response.data
        })
    })
}

export const setLoading = () => {
    return({
        type:SET_LOADING
    })
}