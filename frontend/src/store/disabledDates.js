const SET_DISABLED_DATES = "disabledDates/SET_DISABLED_DATES"


export const setDisabledDates = (dates) => {
    return {
        type:SET_DISABLED_DATES,
        payload:dates
    }
}


const disabledDatesReducer = (state={},action) => {
    let newState = {}
    switch (action.type){
        case SET_DISABLED_DATES:{
            action.payload.forEach(date=>{
                newState[date.id] = date
            })
            return newState
        }
        default:{
            return state
        }
    }
}

export default disabledDatesReducer
