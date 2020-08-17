import React,{useReducer} from 'react'
import {REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED,AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT} from '../types'
import authReducer from "./authReducer"
import AuthContext from "./authContext"
import axios from 'axios'
import setAuthToken from "../../utils/setAuthToken"

const AuthState = (props) => {

    const initialState={
        isAuthenticated:null,
        loading:true,
        user:null,
        error:null,
        token:localStorage.getItem("jwt")
    }

    const [state,dispatch]=useReducer(authReducer,initialState);


    const loadUser=async()=>{
        if(localStorage.jwt){
            setAuthToken(localStorage.jwt);
        }
        try{
            const res=await axios.get("/api/users");

            dispatch({
                type:USER_LOADED,
                payload:res.data
            })

        }catch(err){
            dispatch({type:AUTH_ERROR})
            
        }
    }


    const registerUser=async(formData)=>{

        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }

        try{
            const res=await axios.post("/api/users/register",formData,config);
            // console.log(res.data);
            dispatch({
                type:REGISTER_SUCCESS,payload:res.data
            })
            loadUser();

        }catch(err){
            dispatch({
                type:REGISTER_FAIL,payload:err.response.data.msg
            })
        }
    }


    const login=async(formData)=>{
        const config={
            headers:{
                "Content-Type":"application/json",
            }
        }


        try{
            const res=await axios.post("/api/users/login",formData,config);

            dispatch({
                type:LOGIN_SUCCESS,
                payload:res.data
            })
            loadUser();

        }catch(err){
            dispatch({
                type:LOGIN_FAIL,
                payload:err.response.data.msg
            })

        }

    }


    const logout=()=>{
        dispatch({type:LOGOUT})
    }

   


    
    return (
        <AuthContext.Provider
            value={{
                isAuthenticated:state.isAuthenticated,
                loading:state.loading,
                user:state.user,
                error:state.error,
                token:state.token,
                registerUser,
                loadUser,
                login,
                logout
            }}
        
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
