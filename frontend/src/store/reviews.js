import { csrfFetch } from "./csrf"
const SET_REVIEWS = "reviews/SET_REVIEWS"
const DELETE_REVIEW = "reviews/DELETE_REVIEW"
const TOGGLE_EDIT = "reviews/TOGGLE_EDIT"
const EDIT_REVIEW = "reviews/EDIT_REVIEW"
const SET_BODY = "reviews/SET_BODY"
const ADD_REVIEW = "reviews/ADD_REVIEW"

const setReviews = (reviews) => {
    return {
        type:SET_REVIEWS,
        payload:reviews
    }
}

const editReviewState = (review) => {
    return {
        type:EDIT_REVIEW,
        payload:review
    }
}


export const toggleEdit = () => {
    return {
        type:TOGGLE_EDIT
    }
}

export const setCurrentBody = (body) => {
    return {
        type:SET_BODY,
        payload:body
    }
}


const setReviewsAfterDelete = (id) => {
    return {
        type:DELETE_REVIEW,
        payload:id
    }
}

export const postReview = (review) => async dispatch => {
    let res = await csrfFetch(`/api/reviews`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(review)
    })
    res=await res.json()
    dispatch(setReviews(res))
}

export const getReviews = (spotId) => async dispatch => {
    let res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    res=await res.json()
    dispatch(setReviews(res))
}

export const deleteReview = (id) => async dispatch => {
    await csrfFetch(`/api/reviews/${id}`,{
        method:"DELETE"
    })

    dispatch(setReviewsAfterDelete(id))
}

export const editReview = (review) => async dispatch => {
    await csrfFetch(`/api/reviews/${review.id}`,{
        method:"PUT",
        body:JSON.stringify(review),
        headers:{
            "Content-Type":"application/json"
        }
    })

    dispatch(editReviewState(review))
}

const initialState = {edit:false}
const reviewsReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type){
        case SET_REVIEWS:{
            action.payload.forEach(review=>{
                newState[review.id] = review
            })
            return newState
        }
        case DELETE_REVIEW:{
            newState = {...state}
            delete newState[action.payload]
            return newState
        }
        case EDIT_REVIEW:{
            newState = {...state}
            newState[action.payload.id]=action.payload
            return newState
        }
        case TOGGLE_EDIT:{
            newState = {...state}
            newState.edit = !newState.edit
            return newState
        }
        case SET_BODY:{
            newState={...state}
            newState.body=action.payload
            return newState
        }
    default:{
        return state
    }
    }
}


export default reviewsReducer
