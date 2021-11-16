import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import SignupForm from "./SignupForm"
import {addModal,toggleModalView} from "../../store/session"
import {useDispatch,useSelector} from "react-redux"
import { postReview } from '../../store/reviews';
import { deleteBooking } from '../../store/spots';
import {BsTrashFill} from "react-icons/bs"
function FormModal() {
  const dispatch = useDispatch()
  const [reviewBody,setReviewBody] = useState("")
  const [rating,setRating] = useState("")
  const [showModal, setShowModal] = useState(false);
  const [errors,setErrors] = useState([])
  const modalType= useSelector((state)=>state.session.modalType)
  const modalView = useSelector(state => state.session.modalView)
  const spot = Object.values(useSelector(state => state.spots))[0]
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  const user = useSelector(state=>state.session.user)
  const deleteReservation = (booking) => {
    console.log("BOOKING ID: ",booking.id)
    dispatch(deleteBooking(Number(booking.id)))
  }

  const leaveReview = (e) => {
    e.preventDefault()
    if(!reviewBody){
      setErrors(["Cannot leave a blank review"])
    }
    else if (!rating){
      setErrors(["You must choose a rating"])
    }
    else {
      if(user && spot){
        let review = {authorId:user.id,spotId:spot.id,rating:rating,body:reviewBody}
        dispatch(postReview(review))
      }


    }
  }


  const reviewChange = (value) => {
    setErrors([])
    setReviewBody(value)
  }

  const ratingChange = (value) => {
    setErrors([])
    setRating(value)
  }




  let userForm
  console.log("INSIDE FORM MODAL")
  console.log("MODAL VIEW: ",modalView)
  if(modalView && modalType==="login"){
    userForm = (<LoginForm/>)
  }
  else if (modalView && modalType === "signup"){
    userForm = (<SignupForm/>)
  }
  else if (modalView && modalType === "reservations"){

    let modalInfo = spot.Bookings.filter(booking=>user.id === booking.buyerId)
    modalInfo.sort((a,b)=>new Date(a.checkin) - new Date(b.checkin))
    if(!modalInfo.length){
      dispatch(toggleModalView(false))
      return
    }
    userForm = (
      <>
      <div id = "modal-bookings-header">
        Your reservations for this stay
        </div>
      <div id = "modal-bookings-list">
        {modalInfo.length>0 && modalInfo.map(booking => (
          (<div className = "modal-date-listing" key = {booking.id}>
            <div>{`${monthNames[new Date(booking.checkin).getMonth()]} ${new Date(booking.checkin).getDate()} ${new Date(booking.checkin).getFullYear()} - ${monthNames[new Date(booking.checkout).getMonth()]} ${new Date(booking.checkout).getDate()} ${new Date(booking.checkout).getFullYear()}`}</div>
            <div onClick = {()=>{deleteReservation(booking)}} style = {{cursor:"pointer"}}>{<BsTrashFill/>}</div>
          </div>)
        ))}
      </div>
      </>
    )
  }
  else if (modalView && modalType === "review"){
    userForm = (
      <div id = "modal-review-outer">
        <div id = "modal-reviews-header">
          Leave a Review
        </div>
        <form id = "review-form" onSubmit = {e=>leaveReview(e)}>
        <div style = {(errors && errors.length) ? {display:"flex",justifyContent:"center",margin:"auto",position:"absolute",color:"red",top:"6px"} : {display:"none"}}>
                    {errors && errors.map((error, idx) => <div style = {{textAlign:"center"}} key={idx}>{error}</div>)}
                </div>
          <textarea id = "review-body-input" placeholder = "Write something..." value = {reviewBody} onChange = {e=>reviewChange(e.target.value)} required></textarea>
          <select id = "rating-select" onChange = {e=>ratingChange(e.target.value)} value = {rating} required>
            <option value = "" disabled selected hidden>Rating</option>
            <option value = {0}>0</option>
            <option value = {1}>1</option>
            <option value = {2}>2</option>
            <option value = {3}>3</option>
            <option value = {4}>4</option>
            <option value = {5}>5</option>
          </select>
        </form>
        <input onClick = {leaveReview} id = "review-submit" type = "submit" value = "Submit"></input>
    </div>
    )
  }

  return (
    <>
      {modalView && (
        <Modal onClose={() => dispatch(toggleModalView(false))}>
          {userForm}
        </Modal>
      )}
    </>
  );
}

export default FormModal;
