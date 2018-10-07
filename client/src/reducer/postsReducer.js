import { ADD_POST , GET_POSTS , GET_POST , SET_LOADING ,  DELETE_POST } from '../actions';

const initialState = {
    post: null,
    posts:null,
    loading:false
}

const postsReducer = (state = initialState , action) => {
    switch(action.type){
        case ADD_POST :
            return({
                ...state,
                posts: [action.payload , ...state.posts],
                loading: false
            })
            
        case GET_POST :
            return({
                ...state,
                post: action.payload,
                loading: false
            })
            
        case GET_POSTS :
            return({
                ...state,
                posts: action.payload,
                loading: false
            })
            
        case DELETE_POST :
            return({
                ...state,
                posts : state.posts.filter(post => post._id !== action.payload)
            })
            
        case SET_LOADING :
            return({
                ...state,
                loading:true
            })
            
        default :
            return state
            
    }
}

export default postsReducer;