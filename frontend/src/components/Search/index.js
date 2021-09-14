import "./Search.css"
import {useState} from "react"
import {useHistory} from "react-router-dom"
import { useSelector } from "react-redux"

const Search = () => {
    let [location,setLocation] = useState("")
    let [checkin,setCheckin] = useState("")
    let [checkout,setCheckout] = useState("")
    let [guests,setGuests] = useState("")
    let [type,setType] = useState("non-clicked")
    let history = useHistory()
    let spots = useSelector((state)=>state.spots)
    let onSubmit = () => {
        let correctLocation = location.split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ")
        history.push(`/cities/${correctLocation}`)
    }

    if(type==="clicked")return (
        <>
            <form id = "search-form" onSubmit = {onSubmit}>
                <label htmlFor="location-input">Location</label>
                <input id = "location-input" type = "text" value = {location} onChange = {e=>setLocation(e.target.value)} placeholder="Where are you going?"/>
                <label htmlFor="checkin-input">Check in</label>
                <input id = "checkin-input" type = "text" value = {checkin} onChange = {e=>setCheckin(e.target.value)} placeholder="Add dates"/>
                <label htmlFor="checkout-input">Check out</label>
                <input id = "checkout-input" type = "text" value = {checkout} onChange = {e=>setCheckout(e.target.value)} placeholder="Add dates"/>
                <label htmlFor="guests-input">Guests</label>
                <input id = "guests-input" type = "text" value = {guests} onChange = {e=>setGuests(e.target.value)} placeholder="Add guests"/>
                <input type = "submit" value = "submit"/>
            </form>
        </>
    )
    if(type==="non-clicked")return (
        <>
            <button id = "search-button" onClick={e=>setType("clicked")}>
                <div id="search-button-outer-div">
                    <div id = "search-button-inner-div">
                        Start your search
                    </div>
                    <div id = "search-magnifying-glass">
                    🔍
                    </div>
                </div>
            </button>
        </>
    )
}


export default Search
