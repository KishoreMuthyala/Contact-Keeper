import {REGISTER_FAIL,REGISTER_SUCCESS,LOGIN_FAIL,LOGIN_SUCCESS,USER_LOADED,AUTH_ERROR,LOGOUT} from '../types'



export default (state,action)=>{
    switch(action.type){
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("jwt",action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated:true,
                loading:false
            }

        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
        case LOGIN_FAIL:
            localStorage.removeItem("jwt");
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                error:action.payload,
                loading:false,
                user:null
            }
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                loading:false,
                user:action.payload
            }

        default:
            return state;

    }
}