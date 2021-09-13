
const SET_SPOTS = "spots/SET_SPOTS"
export const setSpots = (spots) => {
    return {
    type:SET_SPOTS,
    payload:spots
    }
}

export const getSpotFromCity = (city) => async dispatch => {
    let res = await fetch(`/api/spots/cities/${city}`)
    let spots = await res.json()
    dispatch(setSpots(spots))
}


const spotsReducer = (state = {}, action) => {
    let newState = {}
    switch (action.type){
        case SET_SPOTS:
            newState = {...action.payload}
            return newState
        default:
            return state
    }
}

export default spotsReducer
