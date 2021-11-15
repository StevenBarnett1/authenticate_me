import { csrfFetch } from "./csrf"
const SET_SPOTS = "spots/SET_SPOTS"
const SET_DATES = "spots/SET_DATES"
const RANDOMIZE_SPOTS = "spots/RANDOMIZE_SPOTS"
const setSpots = (spots) => {
    return {
    type:SET_SPOTS,
    payload:spots
    }
}

const getRandomSpots = (res) => {
    return {
        type:RANDOMIZE_SPOTS,
        payload:res
    }
}
export const randomizeSpots = () => async dispatch => {
    let res = await csrfFetch("/api/spots/random")
    res = await res.json()
    return dispatch(getRandomSpots(res))
}

export const getSpotFromCity = (city) => async dispatch => {
    city = city.split(" ").join("-")
    let res = await csrfFetch(`/api/spots/cities/${city}`)
    let spots = await res.json()
    dispatch(setSpots(spots))
}

export const setDates= (dates) =>{
    console.log("HIT DATE ACTION")
    return(
        {
        type:SET_DATES,
        payload:dates
        }
    )
}

export const getSpotByPk = (id) => async dispatch => {
    let res = await csrfFetch(`/api/spots/${id}`)
    let spot = await res.json()
    dispatch(setSpots(spot))
}

export const getSpots = () => async dispatch =>{
    let res = await csrfFetch("/api/spots")
    let spots = await res.json()

    dispatch(setSpots(spots))
    return spots

}

export const deleteBooking = (id) => async dispatch => {
    let res = await csrfFetch(`/api/bookings/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        },
    })
    res = await res.json()
    dispatch(setSpots(res))
}

const spotsReducer = (state = {}, action) => {
    let newState = {}
    switch (action.type){
        case SET_SPOTS:{
            if(action.payload instanceof Array){
                action.payload.forEach(spot => {
                    newState[spot.id] = spot
                })
            }
            else newState[action.payload.id] = action.payload
            return newState
        }
        case SET_DATES:{
            newState = {...state}
            newState.dates = action.payload
            console.log("HIT DATE REDUCER")
        }
        case RANDOMIZE_SPOTS:{
            console.log("IN RANDOMIZE")
            if(action.payload instanceof Array){
                let num = 0
                action.payload.forEach(spot => {
                    newState[num] = spot
                    num++
                })
            }
            else newState[action.payload.id] = action.payload
            return newState

        }
        default:
            return state
    }
}

export default spotsReducer
