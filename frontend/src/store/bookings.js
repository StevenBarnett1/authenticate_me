const SET_BOOKINGS = "bookings/SET_BOOKINGS"

const setBookings = (bookings) => {
    return {
        type:SET_BOOKINGS,
        payload:bookings
    }
}


export const postBooking = body =>async dispatch=> {
    let res = await fetch(`/api/bookings`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(body)
    })
    res = await res.json()
    dispatch(setBookings(res))
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
