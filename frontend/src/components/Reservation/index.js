import {useState} from "react"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

const Reservation = ({spot}) => {
    let [available,setAvailable] = useState(false)
    const [date, setDate] = useState(new Date());
    const [checkin,setCheckin] = useState("")
    const [checkout,setCheckout] = useState("")
    const [guests,setGuests] = useState("")
    const [calendar, toggleCalendar] = useState(false)

    let onClick = (e)=>{
        e.preventDefault()
        setAvailable((current)=>!current)
    }
    return (
        <>
        <div className = "reservation-upper"></div>
        <div>

            <div id = "spot-checkin" onClick={e=>toggleCalendar(!calendar)}>
            </div>

            <div id = "spot-checkout-input"  onClick={e=>toggleCalendar(!calendar)}>

            </div>

            <div id = "spot-guests-input" >
                
            </div>
            <button type = "submit" value = {available ? "Reserve" : "Check Availability"} onClick={onClick}></button>
        </div>
        <div id = "reservation-total-price">

        </div>
        <Calendar style = {calendar ? {display:"block"} : {display:"hidden"}}
          onChange={(e)=>setDate(e.target.value)}
          value={date}/>
        </>
    )
}

export default Reservation
