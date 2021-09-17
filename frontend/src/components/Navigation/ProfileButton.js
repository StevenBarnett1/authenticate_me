import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import "./Navigation.css"
import LoginModal from '../LoginModal';
import SignupModal from "../SignupModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [loginFormOpen,toggleLoginForm] = useState(false)
  const [signUpFormOpen,toggleSignupForm] = useState(false)

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let loginForm
  let signUpForm
  console.log("USER EXISTS ? ", user, "LOGIN FORM OPEN? ",loginFormOpen)

  if(!user){
    if(loginFormOpen){
      loginForm = (
        <LoginModal/>
      )
    } else if (signUpFormOpen){
      loginForm = (
        <SignupModal />
      )
    }
    else {
    loginForm = null
    signUpForm = null
  }
  }

  console.log("LOGIN FORM: ",loginForm)
  console.log("USER IMAGE", user && user.image)
  console.log("user", user)
  if(!user){
    return (
      <>
        <button id = "profile-button" onClick={openMenu}>
          <div id = "hamburger-icon">
            ☰
          </div>
          <div id = "profile-image">
            👤
          </div>
        </button>
        {showMenu && (
          <div id = "profile-dropdown-outer">
          <div className="profile-dropdown">
            <div>
              <button onClick = {()=>{
                toggleLoginForm(true)
                toggleSignupForm(false)
              }}>Log In</button>
            </div>
            <div>
              <button onClick = {()=>{
                toggleLoginForm(false)
                toggleSignupForm(true)
              }}>Sign Up</button>
            </div>
          </div>
          </div>
        )}
        {loginForm}
        {signUpForm}
      </>
    );
  }
  else {
    return (
      <>
        <button id = "profile-button" onClick={openMenu}>
          <div id = "hamburger-icon">
            ☰
          </div>
          <img id = "profile-image" src = {user && user.image}></img>
        </button>
        {showMenu && (
          <div id = "profile-dropdown-outer">
          <div className="profile-dropdown">
            <div>
              <button onClick={logout}>Log Out</button>
            </div>
          </div>
          </div>
        )}
      </>
    )
  }

}

export default ProfileButton;
