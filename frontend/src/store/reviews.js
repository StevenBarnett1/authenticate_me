const SET_REVIEWS = "reviews/SET_REVIEWS"

const setReviews = (reviews) => {
    return {
        type:SET_REVIEWS,
        payload:reviews
    }
}

const getReviewsWithUsers = () => async dispatch => {
    let res = await fetch("")
}
