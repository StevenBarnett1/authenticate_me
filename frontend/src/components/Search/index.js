import "./Search.css"
import {useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {setNavigation} from "../../store/navigation"
import SearchForm from "./SearchForm"
const Search = () => {

    const clicked = useSelector(state=>state.navigation.clicked)
    const dispatch = useDispatch()

    const onClick = (e) => {
        const headers = document.getElementsByClassName("search-header")
        for(let header of headers){
            header.style.borderBottom = "none"
        }
        e.target.style.borderBottom = "1px solid black"

    }

    


    if(clicked)return (
        <div id = "search-clicked-outer-container">
            <div id = "search-type-container">
                <div className = "search-header" onClick={onClick}>Places to stay</div>
                <div className = "search-header" onClick={onClick}>Experiences</div>
                <div className = "search-header" onClick={onClick}>Online Experiences</div>
            </div>
        </div>
    )
    if(!clicked)return (

        <button id = "search-button" onClick={()=>dispatch(setNavigation(true))}>
            <div id="search-button-outer-div">
                <div id = "search-button-inner-div">
                    Start your search
                </div>
                <div id = "search-magnifying-glass">
                🔍
                </div>
            </div>
        </button>

    )
}


export default Search
