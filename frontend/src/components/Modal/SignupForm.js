import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {addModal,toggleModalView} from "../../store/session"
import * as sessionActions from "../../store/session";
import './UserForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName,setLastName]= useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const user = useSelector(state=>state.session.user)

  useEffect(()=>{
    setErrors([])
  },[email,username,firstName,lastName,password,confirmPassword])
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      console.log("HANDLE SUBMIT: ",email, username, firstName, lastName, password)
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const handleClick = (e) => {
    e.preventDefault()
   dispatch(addModal("login"))
  }

  useEffect(()=>{
    if(user){
      dispatch(toggleModalView(false))
    }
  },[user])

  return (
    <div id = "modal-inner-container">
      <h4 id = "signup-title">Sign Up</h4>
      <div id = "form-outer-container">
        <h2 id = "welcome-title">Welcome to Lairbnb</h2>
        <div style = {(errors && errors.length) ? {display:"block",position:"absolute",color:"red",top:"50px"} : {display:"none"}}>
                    {errors && errors.map((error, idx) => <div key={idx}>{error}</div>)}
                </div>
        <form id = "user-form" onSubmit={handleSubmit}>

          <div id = "form-inputs">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete = "off"
                required
                placeholder = "Email"
              />

              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete = "off"
                required
                placeholder = "First Name"
              />

              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete = "off"
                required
                placeholder = "Last Name"
              />

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
                required
                placeholder = "Username"
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete = "off"
                required
                placeholder = "Password"
              />

              <input style = {{borderBottom:0, borderRadius:"10px"}}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete = "off"
                required
                placeholder = "Confirm Password"
              />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <div id = "change-signin-type" onClick = {handleClick}>Already have an account, log in!</div>
    </div>
    </div>
  );
}

export default SignupFormPage;
