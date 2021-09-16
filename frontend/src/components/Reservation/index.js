import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import "./Reservation.css"
import { postBooking } from "../../store/bookings";
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

Date.prototype.addDays = function(days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

const Reservation = ({spot}) => {
    const [available,setAvailable] = useState(false)
    const [date, setDate] = useState(new Date());
    const [checkin,setCheckin] = useState("")
    const [checkout,setCheckout] = useState("")
    const [guests,setGuests] = useState("")
    const [calendar, toggleCalendar] = useState(true)
    const [activeType,toggleActiveType] = useState("")
    const [dateDifference,setDateDifference] = useState("")
    const [disabledDates,setDisabledDates]= useState([])
    const [errors,setErrors] = ([])

    let findDisabledDates = (start,end) => {
        console.log(start,start instanceof Date)
        console.log(end,end instanceof Date)

        if(typeof start === "string"){
            start = new Date(start)
        }
        if(typeof end === "string"){
            end = new Date(end)
        }
        let dates = []
        let currentDate = start
        while (currentDate <= end) {
            dates.push(currentDate);

            currentDate = currentDate.addDays(1);
        }
        setDisabledDates([...disabledDates,...dates])
    }
    console.log(disabledDates)
    useEffect(()=>{
        if(spot){
            let bookings = Object.values(spot.Bookings)
            bookings.forEach(booking=>{
            findDisabledDates(booking.checkin,booking.checkout)
        })
        }
    },[spot])


    const dispatch = useDispatch()
    let currentUser = useSelector((state)=>state.session.user)

    let onClick = (e)=>{
        e.preventDefault()
        if(available){
            console.log(typeof spotId, typeof buyerId)
            let booking = {checkin,checkout,buyerId:currentUser.id,spotId:spot.id}
            dispatch(postBooking(booking))
            findDisabledDates(checkin,checkout)
            setAvailable(false)

        }
        else {
            if(checkin && checkout){
                //if checkout is before checkin
                //if blacked out dates are between checkin and checkout
                if(disabledDates.filter(date=>date <= checkout && date >= checkin).length){
                    window.alert("Sorry overlapping dates")
                    setCheckout("")
                    setCheckin("")
                } else if (checkin >= checkout){
                    window.alert("You cannot leave before you've arrived!")
                    setCheckout("")
                    setCheckin("")
                }
                else setAvailable((current)=>!current)
            }


        }
    }

    useEffect(()=>{
        toggleCalendar(!calendar)
        if(activeType === "checkin") setCheckin(date)
        else if(activeType==="checkout") setCheckout(date)
        toggleActiveType("")

    },[date])

    useEffect(()=>{
        if(checkin && checkout){
            setDateDifference((checkout.getTime() - checkin.getTime())/1000/60/60/24)
        }
    },[checkin,checkout])
    return (
        <div id = "reservation-container">
            <div id = "reservation-inner-container">
                <div id = "reservation-price-rating-container">
                    <div><strong style={{fontSize:'25px',fontWeight:800}}>${spot &&spot.price}</strong> / night</div>
                    <div><strong style={{fontSize:'18px',fontWeight:800}}>☆{spot && spot.rating}</strong></div>
                </div>
                <div id = "spot-reservation-buttons">
                    <div id = "spot-reservation-date-buttons">
                        <div id = "spot-checkin" onClick={e=>{
                            toggleCalendar(!calendar)
                            toggleActiveType("checkin")
                            }}>
                            <strong>CHECK-IN</strong>
                            <div>{checkin ? `${monthNames[checkin.getMonth()]} ${checkin.getDate()}`:"Add-date"}</div>
                        </div>

                        <div id = "spot-checkout"  onClick={e=>{
                            toggleCalendar(!calendar)
                            toggleActiveType("checkout")
                            }}>
                            <strong>CHECKOUT</strong>
                            <div>{checkout ? `${monthNames[checkout.getMonth()]} ${checkout.getDate()}`:"Add-date"}</div>
                        </div>
                    </div>

                    <div id = "spot-guests" >
                        <strong>GUESTS</strong>
                        <div>{guests}</div>
                    </div>
                </div>

                <button id = "reserve-button" onClick={onClick}>{available ? "Reserve" : "Check Availability"}</button>

                <div id = "reservation-total-price" style = {available ? {display:"block"} : {display:"none"}}>
                    <div>Total</div>
                    <div>${spot && spot.price * (dateDifference)}</div>
                </div>
            </div>
            <div id = "calendar-container" style = {calendar ? {display:"block"} : {display:"none"}}>
                    <Calendar
                        tileDisabled={({date, view}) =>
                        (view === 'month') && // Block day tiles only
                        disabledDates.some(disabledDate =>
                            date.getFullYear() === disabledDate.getFullYear() &&
                            date.getMonth() === disabledDate.getMonth() &&
                            date.getDate() === disabledDate.getDate()
                        )}
                        onChange={setDate}
                        value={date}
                    />
                </div>
        </div>
    )
}

export default Reservation
