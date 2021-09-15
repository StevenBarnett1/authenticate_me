import {useEffect, useState} from "react"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import "./Reservation.css"

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Reservation = ({spot}) => {
    let [available,setAvailable] = useState(false)
    const [date, setDate] = useState(new Date());
    const [checkin,setCheckin] = useState("")
    const [checkout,setCheckout] = useState("")
    const [guests,setGuests] = useState("")
    const [calendar, toggleCalendar] = useState(true)
    const [activeType,toggleActiveType] = useState("")

    let onClick = (e)=>{
        e.preventDefault()
        if(available){
            //make a post request to post a reservation
        }
        else setAvailable((current)=>!current)
    }

    useEffect(()=>{
        let shownDate = `${monthNames[date.getMonth()]} ${date.getDate()}`
        console.log(date)
        console.log(date.getDay())
        toggleCalendar(!calendar)
        if(activeType === "checkin") setCheckin(shownDate)
        else if(activeType==="checkout") setCheckout(shownDate)
        toggleActiveType("")

    },[date])
    console.log("FDGDFGDFGFDGDFGDFG", date.toString())
    return (
        <>
        <div>
            <div>
                <div><strong>${spot &&spot.price}</strong> / night</div>
                <div><strong style={{fontSize:'14px'}}>☆{spot && spot.rating}</strong></div>
            </div>
            <div id = "spot-price"></div>
            <div id = "spot-checkin" onClick={e=>{
                toggleCalendar(!calendar)
                toggleActiveType("checkin")
                }}>
                <strong>CHECK-IN</strong>
                <div>{checkin}</div>
            </div>

            <div id = "spot-checkout"  onClick={e=>{
                toggleCalendar(!calendar)
                toggleActiveType("checkout")
                }}>
                <strong>CHECKOUT</strong>
                <div>{checkout}</div>
            </div>

            <div id = "spot-guests" >
                <strong>GUESTS</strong>
                <div>{guests}</div>
            </div>

            <button onClick={onClick}>{available ? "Reserve" : "Check Availability"}</button>
        </div>
        <div id = "reservation-total-price" style = {available ? {display:"block"} : {display:"none"}}>
            <div>Total</div>
            <div>${spot && spot.price * (Number(checkout.split(" ")[1]) - Number(checkin.split(" ")[1]))}</div>
        </div>
        <div id = "calendar-container" style = {calendar ? {display:"block"} : {display:"none"}}>
            <Calendar

                onChange={setDate}
                value={date}
            />
        </div>
        </>
    )
}

export default Reservation
