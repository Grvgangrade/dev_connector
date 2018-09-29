import axios from 'axios'
import { GET_PROFILE , GET_PROFILES , SET_LOADING , ERROR_STATE , CLEAR_PROFILE , SET_CURRENT_USER} from './index';

export const getProfile = () => dispatch => {
    dispatch(setLoadingProfile())
    axios.get('/api/profile')
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        })
}

//Get Profile by handle
export const getProfileByHandle = (handle) => dispatch => {
    dispatch(setLoadingProfile())
    axios.get(`/api/profile/handle/${handle}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        })
}

//Get all profiles
export const getAllProfiles = () => dispatch => {
    dispatch(setLoadingProfile())
    axios.get('/api/profile/all')
        .then(res => {
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_PROFILES,
                payload: {}
            })
        })
}
              
export const createProfile = (profileData , history) => dispatch => {
    axios.post('api/profile/create-profile', profileData).then(res => {
        history.push('/dashboard')
    })
    .catch(err => {
        dispatch({
            type: ERROR_STATE,
            payload: err.response.data
        })
    })
}

//Add experience
export const addExp = (expData , history ) => dispatch => {
    axios.post('api/profile/experience' , expData).then(res => {
        history.push('/dashboard')
    })
    .catch(err => {
        dispatch({
            type : ERROR_STATE,
            payload: err.response.data
        })
    });
} 

//Delete experience
export const deleteExperience = (id) => dispatch => {
    axios.delete(`api/profile/experience/${id}`).then(res => {
       dispatch({
           type : GET_PROFILE,
           payload: res.data
       })
    })
    .catch(err => {
        dispatch({
            type : ERROR_STATE,
            payload: err.response.data
        })
    });
} 

//Add education
export const addEdu = (eduData , history ) => dispatch => {
    axios.post('api/profile/education' , eduData).then(res => {
        history.push('/dashboard')
    })
    .catch(err => {
        dispatch({
            type : ERROR_STATE,
            payload: err.response.data
        })
    });
} 

//Delete experience
export const deleteEducation = (id) => dispatch => {
    axios.delete(`api/profile/education/${id}`).then(res => {
       dispatch({
           type : GET_PROFILE,
           payload: res.data
       })
    })
    .catch(err => {
        dispatch({
            type : ERROR_STATE,
            payload: err.response.data
        })
    });
} 


//Delete current user
export const deleteUser = () => dispatch => {
    axios.delete('/api/profile').then(res => {
        if(window.confirm('Are you sure you want to delete account ? this will NOT be undone')){
            dispatch({
                type: SET_CURRENT_USER,
                payload: {}
            })
        }
    }).catch(err => {
        dispatch({
            type: ERROR_STATE,
            payload: err.response.data
        })
    });
}

export const setLoadingProfile = () => {
    return({
        type:SET_LOADING
    })  
}

export const clearProfile = () => {
    return({
        type:CLEAR_PROFILE
    })
}