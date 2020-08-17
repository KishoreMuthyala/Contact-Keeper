import React,{useState,useEffect,useContext} from 'react';
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alerts/alertContext";

const Login = (props) => {
    const authContext=useContext(AuthContext);
    const alertContext=useContext(AlertContext);
    const {login,error,isAuthenticated}=authContext;
    useEffect(()=>{
        if(isAuthenticated){
            props.history.push("/");
        }
        
    },[isAuthenticated,props.history])
    const [user,setUser]=useState({
        email:"",
        password:""
    })
    const {email,password}=user;
    const HandleInput=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    
    const onUserLogin=(e)=>{
        e.preventDefault();
        if(!email || !password)
            AlertContext.setAlert("Enter all the fields","danger");
        else
           login({email,password});
    }

    return (
        <div className="container register">
           <h1>Account <span className="text-primary">Login</span></h1>
           <form onSubmit={onUserLogin}>
               
               <div className="form-group">
                   <label htmlFor="email">Email</label>
                   <input type="email" name="email" required onChange={HandleInput} value={email}/>
               </div>
               <div className="form-group">
                   <label htmlFor="password">Password</label>
                   <input type="password" name="password" required onChange={HandleInput} value={password}/>
               </div>
               
               <input type="submit" value="Login" className="btn btn-primary btn-block"/>
           </form>
        </div>
    )
}

export default Login
