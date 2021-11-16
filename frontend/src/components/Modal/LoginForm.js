import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import {addModal, toggleModalView} from "../../store/session"
import "./UserForm.css"

function LoginForm() {

  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const user = useSelector(state=>state.session.user)

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  useEffect(()=>{
    setErrors([])
  },[credential,password])

  const handleClick = (e) => {
    e.preventDefault()
   dispatch(addModal("signup"))
  }

  useEffect(()=>{
    if(user){
      dispatch(toggleModalView(false))
    }
  },[user])

    return (
      <div id = "modal-inner-container" style = {{height:"350px"}}>
        <h4 id = "signup-title">Log In</h4>
        <div id = "form-outer-container">
          <h2 id = "welcome-title">Welcome to Lairbnb</h2>
          <div style = {(errors && errors.length) ? {display:"block",position:"absolute",color:"red",top:"50px"} : {display:"none"}}>
                    {errors && errors.map((error, idx) => <div key={idx}>{error}</div>)}
                </div>
          <form id = "user-form" onSubmit={handleSubmit}>

            <div id = "form-inputs">
                <input
                  type="text"
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  autoComplete = "off"
                  required
                  placeholder = "Email or Username"
                />

                <input style = {{borderBottom:0, borderRadius:"10px"}}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete = "off"
                  required
                  placeholder = "Password"
                />

            </div>
            <button type="submit">Log In</button>
          </form>
          <div id = "change-signin-type" onClick = {handleClick}>Dont have an account, Sign up instead!</div>
      </div>
      </div>
    );
}

export default LoginForm;
