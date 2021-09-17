import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
    </>
  );
}

export default LoginModal;
