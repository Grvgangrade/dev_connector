import { GET_POST , GET_POSTS , ADD_POST , ERROR_STATE , SET_LOADING , DELETE_POST , CLEAR_ERRORS } from './index';
import axios from 'axios';


export const addPost = (postData , history) => dispatch => {
    dispatch(clearErrors());
    axios.post('/api/posts' , postData).then(res => {
        dispatch({
            type: ADD_POST,
            payload: res.data
        })
    })
    .catch(err => 
        dispatch({
            type: ERROR_STATE,
            payload: err.response.data
        })
    );
};

export const getPosts = () => dispatch => {
    dispatch(setLoading())
    axios.get('/api/posts').then(res => {
        dispatch({
            type : GET_POSTS,
            payload: res.data
        })
    })
    .catch(err => 
        dispatch({
            type: GET_POSTS,
            payload: null
        })
    );
};

//get post by ID
export const getPost = (id) => dispatch => {
    dispatch(setLoading())
    axios.get(`/api/posts/${id}`).then(res => {
        dispatch({
            type : GET_POST,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_POST,
            payload: {}
        })
    })
}

//delete posts by ID
export const deletePost = (id) => dispatch => {
    axios.delete(`/api/posts/${id}`).then(res => {
        dispatch({
            type: DELETE_POST,
            payload: id
        })
    })
    .catch(err => {
        console.log(err)
    })
}

//add comment
export const addComment = (commentData ,id) => dispatch => {
    dispatch(clearErrors());
    axios.post(`/api/posts/comment/${id}` , commentData).then(res => {
        dispatch(getPost(id))
    })
    .catch(err => 
        dispatch({
            type: ERROR_STATE,
            payload: err.response.data
        })
    );
};

//like
export const like = (id) => dispatch => {
    axios.post(`/api/posts/like/${id}`).then(res => {
        dispatch(getPosts())
    })
    .catch(err => 
        dispatch({
            type: ERROR_STATE,
            payload: err.response.data
        })
    );
};


//unlike
export const unlike = (id) => dispatch => {
    axios.post(`/api/posts/unlike/${id}`).then(res => {
        dispatch(getPosts())
    })
    .catch(err => 
        dispatch({
            type: ERROR_STATE,
            payload: err.response.data
        })
    );
};


//delete posts by ID
export const deleteComment = (postId , commentId) => dispatch => {
    axios.delete(`/api/posts/comment/${postId}/${commentId}`).then(res => {
        console.log(res)
        dispatch({
            type: GET_POST,
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

//set loading
export const setLoading = () => {
    return({
        type:SET_LOADING
    })
}

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};