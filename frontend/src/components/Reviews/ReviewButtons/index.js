import { useDispatch, useSelector } from "react-redux"
import {useEffect,useState} from "react"
import "./ReviewButtons.css"
import {deleteReview,editReview,toggleEdit} from "../../../store/reviews"

const ReviewButtons = ({review}) => {
    const [editButton,setEditButton] = useState("Edit Review")
    let session = useSelector(state=>state.session)
    let dispatch = useDispatch()
    let body = useSelector((state)=>state.reviews.body)
    let editOnClick = () => {
        if(editButton==="Edit Review"){
            setEditButton("Submit Changes")
        }
        if(editButton==="Submit Changes"){
            const newReview = {...review,body}
            dispatch(editReview(newReview))
            setEditButton("Edit Review")
        }
        dispatch(toggleEdit())

    }

    let deleteOnClick = () => {
        review && dispatch(deleteReview(review.id))
    }

    if(session.user && session.user.id === review.authorId){
        return (
            <div id = "review-edit-delete-container">
                <button id = "review-edit-button" onClick = {editOnClick}>{editButton}</button>
                <button id = "review-delete-button" onClick = {deleteOnClick}>Delete Review</button>
            </div>
        )
    }
    else return null
}

export default ReviewButtons
