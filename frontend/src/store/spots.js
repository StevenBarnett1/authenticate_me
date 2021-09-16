
const SET_SPOTS = "spots/SET_SPOTS"
const SET_DATES = "spots/SET_DATES"

const setSpots = (spots) => {
    return {
    type:SET_SPOTS,
    payload:spots
    }
}

export const getSpotFromCity = (city) => async dispatch => {
    city = city.split(" ").join("-")
    let res = await fetch(`/api/spots/cities/${city}`)
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
    let res = await fetch(`/api/spots/${id}`)
    let spot = await res.json()
    dispatch(setSpots(spot))
}

export const getSpots = () => async dispatch =>{
    let res = await fetch("/api/spots")
    let spots = await res.json()

    dispatch(setSpots(spots))
    return spots

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
        default:
            return state
    }
}

export default spotsReducer
