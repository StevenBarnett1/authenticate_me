import { useDispatch, useSelector } from "react-redux"

import {useEffect} from "react"
import "./Reviews.css"


const Reviews = ({reviews}) => {

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
                        </div>
                        <div>{review.body}</div>
                    </div>
                ))}
            </div>
        </>
    )
}




export default Reviews
