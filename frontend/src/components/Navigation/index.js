import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import Search from "../Search"
import SearchForm from "../Search/SearchForm"
import './Navigation.css';


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const location = useLocation()
  const searchClicked = useSelector(state=>state.navigation.clicked)
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

  let navBarStyle = {
  }
  location.pathname.toString().startsWith("/spots/") ? navBarStyle.position = "relative" : navBarStyle.position = "sticky"
  searchClicked ? navBarStyle.height = "180px" : navBarStyle.height = "80px"
  console.log("HEREEEE: ",searchClicked)
  return (
    <div id = "navbar" style = {navBarStyle}>
      <div id = "navbar-inner-container">
        <div id = "navbar-top-container" style = {searchClicked ? {height: "80px"} : {height:"80px"}}>
          <div id = "airbnb-logo-outer-container">
            <NavLink exact to="/">
              <img id = "airbnb-image" src = "https://1000logos.net/wp-content/uploads/2017/08/Airbnb-logo.jpg"></img>
            </NavLink>
          </div>
            <Search />
          <div id ="navbar-user-outer-container">
            <div>{isLoaded && sessionLinks}</div>
          </div>
        </div>
        <div id = "navbar-lower-container" style = {searchClicked ? {display:"block", height: "65%"} : {display:"none"}}>
          <SearchForm />
        </div>
      </div>
    </div>
  );
}

export default Navigation;
