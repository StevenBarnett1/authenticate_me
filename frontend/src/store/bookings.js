import { csrfFetch } from "./csrf"
const SET_BOOKINGS = "bookings/SET_BOOKINGS"


export const setBookings = (bookings) => {
    return {
        type:SET_BOOKINGS,
        payload:bookings
    }
}





const bookingsReducer = (state = {}, action) => {
    let newState = {}
    switch (action.type){
        case SET_BOOKINGS:{
            if(action.payload instanceof Array){
                action.payload.forEach(booking => {
                    newState[booking.id] = booking
                })
            }
            else newState[action.payload.id] = action.payload
            return newState
        }
        default:
            return state
    }
}

export default bookingsReducer
