import React,{useContext,Fragment} from 'react';
import {Link} from "react-router-dom";
import AuthContext from "../../context/auth/authContext"

const Navbar = () => {


    const authContext=useContext(AuthContext);
    const {isAuthenticated,user}=authContext;

    const logoutFunction=()=>{
        authContext.logout();
    }

    const guestLinks=(
        <Fragment>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
            
        </Fragment>
    )

    const  userLinks=(
        <Fragment>
            <li>Hello {user&&user.name}</li>
            <li>
                    <Link to="/about">About App</Link>
                </li>
            <li>
                <a onClick={logoutFunction} hrer="#!" style={{cursor:"pointer"}}>
                    <i className="fas fa-sign-out-alt" />
                    <span className="hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    )


    return (
        <div className="navbar bg-primary">
            <h1>
                <Link to="/">
                    <i className="fas fa-id-card-alt"></i>
                </Link>
                <Link to="/">
                    Contact Keeper
                </Link>
            </h1>
            <ul>    
               {isAuthenticated ? userLinks:guestLinks}
            </ul>
        </div>
    )
}

export default Navbar
