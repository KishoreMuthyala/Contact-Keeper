import React,{Fragment} from 'react';
import './App.css';
import Navbar from "./components/layout/Navbar"
import {BrowserRouter,Route,Switch} from "react-router-dom";
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import About from "./components/pages/About";
import Home from "./components/pages/Home"
import AlertState from "./context/alerts/AlertState"
import AuthState from "./context/auth/AuthState"
import setAuthToken from "./utils/setAuthToken"
import PrivateRoute from "./components/routing/PrivateRoute"
import ContactState from "./context/contact/ContactState";

if(localStorage.jwt){
  setAuthToken(localStorage.jwt)
}


function App() {
  return (
    <AuthState>
    <ContactState>
    <AlertState>
    <BrowserRouter>
    <Fragment>
      <Navbar />
      <div className="container">
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/about" component={About} />
        </Switch>
      </div>
      </Fragment>
    </BrowserRouter>
    </AlertState>
    </ContactState>
    </AuthState>
  );  
}

export default App;