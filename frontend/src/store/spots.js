
const SET_SPOTS = "spots/SET_SPOTS"

const setSpots = (spots) => {
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

export const getSpotByPk = (id) => async dispatch => {
    let res = await fetch(`/api/spots/${id}`)
    let spot = await res.json()
    dispatch(setSpots(spot))
}



// let getInitialState = async () => {
//     let res = await fetch("/api/spots")
//     let spots = await res.json()
//     console.log("SPOTS: ",spots)

//     let state = {}
//     spots.forEach(spot => {
//         state[spot.id] = spot
//     })
//     console.log("STATE: ",state)
//     return state

// }

// let initialState = getInitialState()

const spotsReducer = (state = {}, action) => {
    let newState = {}
    switch (action.type){
        case SET_SPOTS:{
            console.log("PAYLOAD", action.payload)
            newState = {...action.payload}
            return newState
        }
        default:
            return state
    }
}

export default spotsReducer
