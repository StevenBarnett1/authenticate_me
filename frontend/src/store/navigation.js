const SET_NAVIGATION = "reviews/SET_NAVIGATION"

export const setNavigation = (clicked) => {
    return {
        type:SET_NAVIGATION,
        payload:clicked
    }
}

let initialState = {clicked:false}
const navigationReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type){
        case SET_NAVIGATION:{
            newState.clicked = action.payload
            return newState
        }
    default:{
        return state
    }
    }
}

export default navigationReducer
