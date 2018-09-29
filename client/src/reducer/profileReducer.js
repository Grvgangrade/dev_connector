import { GET_PROFILE , SET_LOADING , CLEAR_PROFILE , GET_PROFILES } from '../actions';

const initialState = {
    profile: null,
    profiles: null,
    loading: false,
    errors : {}
}

const profileReducer = ( state = initialState , action) => {
    switch(action.type){
        case GET_PROFILE :
            return ({
                ...state,
                profile: action.payload,
                loading:false
            })
            
        case GET_PROFILES :
        return ({
            ...state,
            profiles: action.payload,
            loading:false
        })
            
        case SET_LOADING :
            return ({
                ...state,
                loading: true
            })
            
        case CLEAR_PROFILE :
            return({
                ...state,
                profile: null,
                loading: false
            })
        
        default :
            return state;
    }
}

export default profileReducer;