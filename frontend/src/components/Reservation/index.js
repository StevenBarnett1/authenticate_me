import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import Calendar from 'react-calendar'
import {addModal,toggleModalView,toggleModalRequired,setModalInfo} from "../../store/session"
import 'react-calendar/dist/Calendar.css';
import "./Reservation.css"
import { postBooking } from "../../store/spots";
import FormModal from "../Modal";
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
    const [errors,setErrors] = useState([])
    const [selfBookings,setSelfBookings] = useState([])
    const user = useSelector(state => state.session.user)
    const modalRequired = useSelector(state=>state.session.modalRequired)
    let findDisabledDates = (start,end) => {

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

    let findDisabledDatesNoUpdate = (start,end) => {

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
        return dates
    }

    useEffect(()=>{
        if(spot){
            let bookings = Object.values(spot.Bookings)
            let start = new Date();
            let end = new Date()
            end.setDate(end.getDate()-1)
            start.setFullYear(start.getFullYear() - 1);

            let finalDates = findDisabledDatesNoUpdate(start,end)

            bookings.forEach(booking=>{
                finalDates = [...finalDates, ...findDisabledDatesNoUpdate(booking.checkin,booking.checkout)]
            })
            for(let date of finalDates){
            }
            setDisabledDates(finalDates)
        }
    },[spot,user])

    useEffect(()=>{
        if(spot && user){
            setSelfBookings(spot.Bookings.filter(booking=>Number(booking.buyerId) === Number(user.id)))
        }
    },[spot,user])



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

    useEffect(()=>{
        if(modalRequired){
            dispatch(addModal("login"))
            dispatch(toggleModalView(true))
            dispatch(toggleModalRequired(false))
        }
    },[modalRequired])

    const dispatch = useDispatch()
    let currentUser = useSelector((state)=>state.session.user)
    const modalView = useSelector(state=>state.session.modalView)

    const openReservationModal = () => {
        dispatch(toggleModalView(true))
        if(!user){
            dispatch(addModal("login"))
            return
        }
        dispatch(addModal("reservations"))
    }

    let onClick = (e)=>{
        e.preventDefault()
        if(!currentUser){
            dispatch(toggleModalView(true))
            dispatch(addModal("login"))
        }
        else{
        if(available){
            let booking = {checkin,checkout,buyerId:currentUser.id,spotId:spot.id}
            dispatch(postBooking(booking))
            setSelfBookings([...selfBookings,booking])
            findDisabledDates(checkin,checkout)
            setAvailable(false)
        }
        else {
            if(checkin && checkout){
                if(disabledDates.filter(date=>date <= checkout && date >= checkin).length){
                    setErrors(["Sorry overlapping dates"])
                    setCheckout("")
                    setCheckin("")
                }
                else if (new Date(checkin).getDate() === new Date(checkout).getDate()){
                    setErrors(["You cannot leave on the day you arrive!"])
                    setCheckout("")
                    setCheckin("")
                }
                 else if (checkin >= checkout){
                    setErrors(["You cannot leave before you've arrived!"])
                    setCheckout("")
                    setCheckin("")
                }
                else setAvailable((current)=>!current)
            }
            }

        }
        }

        useEffect(()=>{
            if(checkin)setErrors([])
            if(checkout)setErrors([])
        },[checkin,checkout])

    return (
        <div id = "reservation-container" style = {available ? {height:"325px"} : {height:"275px"}}>
            <div id = "reservation-inner-container" >
                <div id = "reservation-price-rating-container">
                    <div><strong style={{fontSize:'25px',fontWeight:800}}>${spot &&spot.price}</strong> / night</div>
                    <div><strong style={{fontSize:'18px',fontWeight:800}}>☆{spot && spot.rating}</strong></div>
                </div>
                <div style = {(errors && errors.length) ? {display:"block",position:"absolute",color:"red",top:"50px"} : {display:"none"}}>
                    {errors && errors.map((error, idx) => <div key={idx}>{error}</div>)}
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
                        <strong style = {{position:"absolute"}}>GUESTS</strong>
                        <input type = "text" onChange = {(e)=>setGuests(e.target.value)} value = {guests} style = {{border:"none"}}/>
                    </div>
                </div>
                <div id = "reservation-cancel-link" onClick = {openReservationModal} style = {(selfBookings.length && user) ? {display:"flex",position:"absolute",top:"190px",fontWeight:"bold",cursor:"pointer",fontSize:"14px"} : {display:"none"} }>
                    Current Reservations
            </div>

                <button id = "reserve-button" onClick={onClick}>{available ? "Reserve" : "Check Availability"}</button>
            </div>

            <div id = "reservation-total-price" style = {available ? {visibility:"visible"} : {fontSize:"0px",visibility:"hidden",height:"10px"}}>
                    <div>Total:</div>
                    <div>${spot && spot.price * (dateDifference)}</div>
            </div>

            <div id = "calendar-container" style = {calendar ? {display:"block",marginTop:"10px"} : {display:"none"}}>
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
            {modalView && (<FormModal/>)}
            {/* {modalView && !currentUser ? (<FormModal/>): null} */}
        </div>
    )
}

export default Reservation
