import { useDispatch, useSelector } from "react-redux"
import {getReviews} from "../../store/reviews"
import {useEffect} from "react"
import "./Reviews.css"
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Reviews = ({spot}) => {
    let dispatch = useDispatch()

    useEffect(() => {
        if (spot)dispatch(getReviews(spot.id))
    }, [dispatch,spot])

    let reviews = useSelector((state)=>state.reviews)
    reviews = Object.values(reviews)
    reviews = reviews.map(review => {
        let date = new Date(review.createdAt)
        let month = monthNames[date.getMonth()]
        let day = date.getDate()

        return {...review,createdAt:`${month} ${day}`}
    })
    console.log("REVIEWSSSSSS",reviews)
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
