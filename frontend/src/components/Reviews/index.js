import { useDispatch, useSelector } from "react-redux"
import {getReviews} from "../../store/reviews"
import {useEffect} from "react"
const Reviews = ({spot}) => {
    let dispatch = useDispatch()

    useEffect(() => {
        if (spot)dispatch(getReviews(spot.id))
    }, [dispatch])

    let reviews = useSelector((state)=>state.reviews)
    reviews = Object.values(reviews)
    console.log("REVIEWSSSSSS",reviews)

    return (
        <>
            <div id = "spot-overall-review"></div>
            <div id = "reviews-container">
                {reviews && reviews.map(review => (
                    <div key = {review.id} id = "individual-review-container">
                        <div id = "individual-review-container-top">
                            <div>{review.User.firstName}</div>
                            <div>{typeof review.createdAt}</div>
                        </div>
                        <div>{review.body}</div>
                    </div>
                ))}
            </div>
        </>
    )
}




export default Reviews
