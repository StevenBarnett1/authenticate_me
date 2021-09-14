import {useState} from "react"


const Reservation = () => {
    let [available,setAvailable] = useState(false)

    let onClick = (e)=>{
        e.preventDefault()
        setAvailable(true)
    }
    return (
        <>
        <div className = "reservation-upper"></div>
        <form>
            <label htmlFor = "spot-checkin-input">CHECK-IN</label>
            <input id = "spot-checkin-input"/>
            <label htmlFor = "spot-checkin-input">CHECKOUT</label>
            <input id = "spot-checkout-input"/>
            <label htmlFor = "spot-guests-input">GUESTS</label>
            <input id = "spot-guests-input"/>
            <input type = "submit" value = {available ? "Reserve" : "Check Availability"} onClick={onClick}></input>
        </form>
        </>
    )
}

export default Reservation
