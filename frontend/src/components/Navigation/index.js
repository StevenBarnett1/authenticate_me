import React, {useState, useEffect} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector ,useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import Search from "../Search"
import SearchForm from "../Search/SearchForm"
import { setNavigation } from '../../store/navigation';
import './Navigation.css';
import airbnb from "./Airbnb-logo.jpeg"


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const location = useLocation()
  const searchClicked = useSelector(state=>state.navigation.clicked)
  const [searchTypeContainer,setContainer] = useState(document.getElementById("search-type-container"))
  const dispatch = useDispatch()

  console.log("SESSION USER", sessionUser)

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
              <img id = "airbnb-image" src={airbnb} />
            </NavLink>
          </div>
            <Search />
          <div id ="navbar-user-outer-container">
            <ProfileButton user = {sessionUser}/>
          </div>
        </div>
        <div id = "navbar-lower-container"  style = {searchClicked ? {visibility:"visible", height: "65%"} : {visibility:"hidden",height:"0px",padding:"0px",margin:"0px"}}>
          <SearchForm />
        </div>
      </div>
    </div>
  );
}

export default Navigation;
