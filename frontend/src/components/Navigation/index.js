import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import Search from "../Search"
import './Navigation.css';


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div id = "navbar-ul">
      <div id = "airbnb-logo-outer-container">
        <NavLink exact to="/">
          <img id = "airbnb-image" src = "https://1000logos.net/wp-content/uploads/2017/08/Airbnb-logo.jpg"></img>
        </NavLink>
      </div>
      <div id = "search-outer-container">
        <Search />
      </div>
      <div id ="navbar-user-outer-container">
        <div>{isLoaded && sessionLinks}</div>
      </div>
    </div>
  );
}

export default Navigation;
