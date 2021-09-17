import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

function SignupModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
    </>
  );
}

export default SignupModal;
