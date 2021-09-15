const SET_REVIEWS = "reviews/SET_REVIEWS"

const setReviews = (reviews) => {
    return {
        type:SET_REVIEWS,
        payload:reviews
    }
}

export const getReviews = (spotId) => async dispatch => {
    let res = await fetch(`/api/spots/${spotId}/reviews`)
    res=await res.json()
    dispatch(setReviews(res))
}


const reviewsReducer = (state = {}, action) => {
    let newState = {}
    switch (action.type){
        case SET_REVIEWS:{
            action.payload.forEach(review=>{
                newState[review.id] = review
            })
            return newState
        }
    default:{
        return state
    }
    }
}


export default reviewsReducer
