import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import SignupForm from "./SignupForm"
import {addModal,toggleModalView} from "../../store/session"
import {useDispatch,useSelector} from "react-redux"
import { deleteBooking } from '../../store/spots';
import {BsTrashFill} from "react-icons/bs"
function FormModal() {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false);
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
    console.log("SPOT HERE: ",spot)
    console.log("BOOKINGS HERE: ",spot.Bookings)
    let modalInfo = spot.Bookings.filter(booking=>user.id === booking.buyerId)
    modalInfo.sort((a,b)=>new Date(a.checkin) - new Date(b.checkin))

    userForm = (
      <div id = "modal-bookings-list">
        {!modalInfo.length && (<div>You have not made any bookings!</div>)}
        {modalInfo.length>0 && modalInfo.map(booking => (
          (<div className = "modal-date-listing" key = {booking.id}>
            <div>{`${monthNames[new Date(booking.checkin).getMonth()]} ${new Date(booking.checkin).getDate()} ${new Date(booking.checkin).getFullYear()} - ${monthNames[new Date(booking.checkout).getMonth()]} ${new Date(booking.checkout).getDate()} ${new Date(booking.checkout).getFullYear()}`}</div>
            <div onClick = {()=>{deleteReservation(booking)}} style = {{cursor:"pointer"}}>{<BsTrashFill/>}</div>
          </div>)
        ))}
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
