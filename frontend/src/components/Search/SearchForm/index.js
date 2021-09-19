import "../Search.css"
import {useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {setNavigation} from "../../../store/navigation"
import Calendar from 'react-calendar'
import { setDates } from "../../../store/spots"

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];


const SearchForm= () => {
    const [location,setLocation] = useState("")
    const [checkin,setCheckin] = useState("")
    const [checkout,setCheckout] = useState("")
    const [guests,setGuests] = useState("")
    const [checkoutClicked,toggleCheckoutClicked] = useState(false)
    const [checkinClicked,toggleCheckinClicked] = useState(false)
    const [date, setDate] = useState(new Date());
    const [activeType,toggleActiveType] = useState("")
    const dispatch = useDispatch()
    const history = useHistory()
    let onSubmit = (e) => {
        e.preventDefault()
        dispatch(setNavigation(false))
        if(location){
            const correctLocation = location.split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join("-")

            if(checkin && checkout){
                history.push({
                    pathname:`/cities/${correctLocation}`,
                    state:{dates:{checkin,checkout}}
                })
            }
            else history.push(`/cities/${correctLocation}`,{state:"TEST"})
        }
        else{
            if(checkin && checkout){
                history.push({
                    pathname:`/spots`,
                    state:{dates:{checkin,checkout}}
                })
            }
            else history.push(`/spots`)
        }
    }

    const calendarStyle = {}
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
                    <input id = "location-input" type = "text" autoComplete="off" value = {location} onChange = {e=>setLocation(e.target.value)} placeholder="Where are you going?"/>
                </div>
                <div id = "search-checkin-container" onClick = {e=>{
                    toggleCheckoutClicked(false)
                    toggleCheckinClicked(!checkinClicked)
                    toggleActiveType("checkin")
                }}>
                    <label htmlFor="checkin-input">Check in</label>
                    <input id = "checkin-input" type = "text" autoComplete="off" placeholder = "Add-dates" onChange = {e=>setCheckin(e.target.value)}  value = {checkin ? `${monthNames[checkin.getMonth()]} ${checkin.getDate()}`:checkin}/>
                </div>
                <div id = "search-checkout-container" onClick = {e=>{
                    toggleCheckinClicked(false)
                    toggleCheckoutClicked(!checkoutClicked)
                    toggleActiveType("checkout")
                    }}>
                    <label htmlFor="checkout-input">Check out</label>
                    <input id = "checkout-input" type = "text"  autoComplete="off"placeholder = "Add-dates" onChange = {e=>setCheckout(e.target.value)}  value = {checkout ? `${monthNames[checkout.getMonth()]} ${checkout.getDate()}`:checkout}/>
                </div>
                <div id = "search-guests-container" onClick = {e=>{
                    toggleCheckoutClicked(false)
                    toggleCheckinClicked(false)
                }}>
                    <div id = "search-guests-inner-container">
                        <label htmlFor="guests-input">Guests</label>
                        <input id = "guests-input" type = "text" autoComplete="off" value = {guests} onChange = {e=>setGuests(e.target.value)} placeholder="Add guests"/>
                    </div>
                    <input id = "search-form-submit" type = "submit" value = "🔍 Search"/>
                </div>
            </form>
            <div style = {calendarStyle} id = "calendar-container">
            <Calendar onChange={setDate}
                        value={date}
            />
            </div>
        </div>
    )
}

export default SearchForm
