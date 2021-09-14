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
    <ul id = "navbar-ul">
      <li>
        <NavLink exact to="/">Airbnb</NavLink>
      </li>
      <li>
        <Search />
      </li>
      <li id ="navbar-user">
        <div>{isLoaded && sessionLinks}</div>
      </li>
    </ul>
  );
}

export default Navigation;
