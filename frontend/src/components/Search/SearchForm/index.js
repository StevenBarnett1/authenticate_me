import "../Search.css"
import {useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {setNavigation} from "../../../store/navigation"
import Calendar from 'react-calendar'

const SearchForm= () => {
    let [location,setLocation] = useState("")
    let [checkin,setCheckin] = useState("")
    let [checkout,setCheckout] = useState("")
    let [guests,setGuests] = useState("")
    let [checkoutClicked,toggleCheckoutClicked] = useState(false)
    let [checkinClicked,toggleCheckinClicked] = useState(false)
    const [date, setDate] = useState(new Date());
    const [activeType,toggleActiveType] = useState("")
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
    let history = useHistory()
    let onSubmit = () => {
        let correctLocation = location.split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ")
        history.push(`/cities/${correctLocation}`)
    }

    let calendarStyle = {

    }
    if(checkinClicked){
        calendarStyle.display="block"
    }
    else if(checkoutClicked){
        calendarStyle.display="block"
    }
    else{
        calendarStyle.display="none"
    }

    useEffect(()=>{
        if(activeType === "checkin") setCheckin(date)
        else if(activeType==="checkout") setCheckout(date)
        toggleActiveType("")


    },[date])

    console.log("DFSFGFGFDGFDG",checkinClicked)
    return (
        <div id = "search-form-calendar-container">
            <form id = "search-form" onSubmit = {onSubmit}>
                <div id = "search-location-container" onClick = {e=>{
                    toggleCheckoutClicked(false)
                    toggleCheckinClicked(false)

                }}>
                    <label htmlFor="location-input">Location</label>
                    <input id = "location-input" type = "text" autocomplete="off" value = {location} onChange = {e=>setLocation(e.target.value)} placeholder="Where are you going?"/>
                </div>
                <div id = "search-checkin-container" onClick = {e=>{
                    toggleCheckoutClicked(false)
                    toggleCheckinClicked(!checkinClicked)
                    toggleActiveType("checkin")
                }}>
                    <label htmlFor="checkin-input">Check in</label>
                    <input id = "checkin-input" type = "text" autocomplete="off" placeholder = "Add-dates" onChange = {e=>setCheckin(e.target.value)}  value = {checkin ? `${monthNames[checkin.getMonth()]} ${checkin.getDate()}`:null}/>
                </div>
                <div id = "search-checkout-container" onClick = {e=>{
                    toggleCheckinClicked(false)
                    toggleCheckoutClicked(!checkoutClicked)
                    toggleActiveType("checkout")
                    }}>
                    <label htmlFor="checkout-input">Check out</label>
                    <input id = "checkout-input" type = "text"  autocomplete="off"placeholder = "Add-dates" onChange = {e=>setCheckout(e.target.value)}  value = {checkout ? `${monthNames[checkout.getMonth()]} ${checkout.getDate()}`:null}/>
                </div>
                <div id = "search-guests-container" onClick = {e=>{
                    toggleCheckoutClicked(false)
                    toggleCheckinClicked(false)
                }}>
                    <div id = "search-guests-inner-container">
                        <label htmlFor="guests-input">Guests</label>
                        <input id = "guests-input" type = "text" autocomplete="off" value = {guests} onChange = {e=>setGuests(e.target.value)} placeholder="Add guests"/>
                    </div>
                    <input id = "search-form-submit" type = "submit" value = "🔍 Search"/>
                </div>
            </form>
            <div style = {calendarStyle}id = "calendar-container">
            <Calendar onChange={setDate}
                        value={date}
            />
            </div>
        </div>
    )
}

export default SearchForm
