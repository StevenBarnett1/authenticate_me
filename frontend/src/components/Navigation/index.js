import React, {useState, useEffect} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector ,useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import Search from "../Search"
import SearchForm from "../Search/SearchForm"
import { setNavigation } from '../../store/navigation';
import './Navigation.css';


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const location = useLocation()
  const searchClicked = useSelector(state=>state.navigation.clicked)
  const [searchTypeContainer,setContainer] = useState(document.getElementById("search-type-container"))
  const dispatch = useDispatch()
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

  const clickOffNavbar = (event=>{
    let navbar = document.getElementById("navbar")
    let clickedInside
    let node = event.target
    if(node === navbar) clickedInside = true
    while(node){
      node=node.parentNode
      console.log(node)
      if(node===navbar)clickedInside=true
    }
    if(!clickedInside){dispatch(setNavigation(false))
      document.removeEventListener("click",clickOffNavbar)
    }

  })
  useEffect(() => {

    setContainer(document.getElementById("search-type-container"))
    console.log(searchClicked,searchTypeContainer)
    if(searchClicked && searchTypeContainer){
      document.addEventListener("click",clickOffNavbar)
    }
  }, [searchClicked,searchTypeContainer])

  let navBarStyle = {
  }
  location.pathname.toString().startsWith("/spots/") ? navBarStyle.position = "relative" : navBarStyle.position = "sticky"
  searchClicked ? navBarStyle.height = "180px" : navBarStyle.height = "80px"


  console.log("HEREEEE: ",searchClicked)
  return (
    <div id = "navbar" tabIndex = "0" onBlur = {()=>setNavigation(false)} style = {navBarStyle}>
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
