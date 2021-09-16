import { useDispatch, useSelector } from "react-redux"
import ReviewButtons from "./ReviewButtons"
import {useEffect, useState} from "react"
import "./Reviews.css"
import { setCurrentBody } from "../../store/reviews"


const Reviews = ({reviews}) => {
    const edit = useSelector(state=>state.reviews.edit)
    const user = useSelector(state=>state.session.user)
    const dispatch = useDispatch()
    const bodyChange = (body) => {
        dispatch(setCurrentBody(body))
    }
    let body = useSelector(state=>state.reviews.body)
    console.log("DFDFDFDFDFDF",body)
    return (
        <>
            <div id = "spot-overall-review"></div>
            <div id = "reviews-container">
                {reviews && reviews.map(review => (
                    <div key = {review.id} id = "individual-review-container">
                        <div id = "individual-review-container-top">
                            <div id = "individual-review-container-top-left">
                                <img src = {review.User.image}></img>
                            </div>
                            <div id = "individual-review-container-top-right">
                                <div>{review.User.firstName}</div>
                                <p>{review.createdAt}</p>

                            </div>
                            <ReviewButtons review = {review}/>
                        </div>
                        {/* <div id = "review-body-container"> */}
                        {edit && user.id === review.authorId ? <textarea onChange={e =>bodyChange(e.target.value)} value = {body ? body : review.body}></textarea>: <div>{review.body}</div> }
                        {/* </div> */}
                    </div>
                ))}
            </div>
        </>
    )
}




export default Reviews
