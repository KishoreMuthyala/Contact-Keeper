import React,{useState,useContext,useEffect} from 'react';
import AlertContext from "../../context/alerts/alertContext";
import AuthContext from "../../context/auth/authContext"

const Register = (props) => {
    
    const alertContext=useContext(AlertContext);
    const authContext=useContext(AuthContext);

    const {error,isAuthenticated}=authContext;

    useEffect(()=>{
        if(isAuthenticated){
            props.history.push("/");
        }
       
    },[isAuthenticated,props.history])

   

    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
        password2:""
    });

    const {name,email,password,password2}=user;


    const onHandleChange =(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }

    const onSubmitData=(e)=>{
        e.preventDefault();
        if(name===""||email===""||password===""||password2===""){
           alertContext.setAlert("Please fill all details","danger")
        }else if(password!==password2){
           alertContext.setAlert("Passwords doesn't match","danger")
        }else{
            const dataOfUser={
                name,
                email,
                password
            }
            //console.log(dataOfUser)
            authContext.registerUser(dataOfUser)
        }
        setUser({
            name:"",
            email:"",
            password:"",
            password2:""
        })
    }

    return (
        <div className="container register">
           <h1>Account <span className="text-primary">Register</span></h1>
           <form onSubmit={onSubmitData}>
               <div className="form-group">
                   <label htmlFor="name">Name</label>
                   <input type="text" name="name" required onChange={onHandleChange} value={name} />
               </div>
               <div className="form-group">
                   <label htmlFor="email">Email</label>
                   <input type="email" name="email" required onChange={onHandleChange} value={email} />
               </div>
               <div className="form-group">
                   <label htmlFor="password">Password</label>
                   <input type="password" name="password" required onChange={onHandleChange} value={password} />
               </div>
               <div className="form-group">
                   <label htmlFor="password2">Confirm Password</label>
                   <input type="password" name="password2" required onChange={onHandleChange} value={password2} />
               </div>
               <input type="submit" value="Register" className="btn btn-primary btn-block" />
           </form>
        </div>
    )
}

export default Register
