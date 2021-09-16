import "./Search.css"
import {useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {setNavigation} from "../../store/navigation"
import SearchForm from "./SearchForm"
const Search = () => {

    let [clicked,setClicked] = useState(false)
    let history = useHistory()
    let spots = useSelector((state)=>state.spots)
    let dispatch = useDispatch()

    useEffect(()=>{
        if(clicked){
            dispatch(setNavigation(true))
        } else if (!clicked){
            dispatch(setNavigation(false))
        }
    },[clicked])

    // let searchClicked = useSelector(state=>state.navigation.clicked)

    if(clicked)return (
        <div id = "search-clicked-outer-container">
            <div id = "search-type-container">
                <div>Places to stay</div>
                <div>Experiences</div>
                <div>Online Experiences</div>
            </div>
        </div>
    )
    if(!clicked)return (

        <button id = "search-button" onClick={e=>setClicked(true)}>
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
