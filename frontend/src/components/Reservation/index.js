import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import "./Reservation.css"
import { postBooking } from "../../store/bookings";
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

    const dispatch = useDispatch()
    let currentUser = useSelector((state)=>state.session.user)
    let onClick = (e)=>{
        e.preventDefault()
        if(available){
            let booking = {checkin,checkout,buyerId:currentUser.id,spotId:spot.id}
            dispatch(postBooking(booking))
        }
        else setAvailable((current)=>!current)
    }

    useEffect(()=>{
        toggleCalendar(!calendar)
        if(activeType === "checkin") setCheckin(date)
        else if(activeType==="checkout") setCheckout(date)
        toggleActiveType("")

    },[date])


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
                <div>{checkin && `${monthNames[checkin.getMonth()]} ${checkin.getDate()}`}</div>
            </div>

            <div id = "spot-checkout"  onClick={e=>{
                toggleCalendar(!calendar)
                toggleActiveType("checkout")
                }}>
                <strong>CHECKOUT</strong>
                <div>{checkout && `${monthNames[checkout.getMonth()]} ${checkout.getDate()}`}</div>
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
