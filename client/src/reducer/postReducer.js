import { ADD_POST , SET_LOADING , ERROR_STATE } from '../actions';

const initialState = {
    post: null,
    posts:[],
    loading:false
}

const postReducer = (state = initialState , action) => {
    switch(action.type){
        case ADD_POST :
            return({
                ...state,
                post: action.payload,
                posts: [...state.posts , action.payload],
                loading: false
            })
            
        case SET_LOADING :
            return({
                ...state,
                loading:false
            })
            
        default :
            return state
            
    }
}

export default postReducer;