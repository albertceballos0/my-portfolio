'use client'

import React from 'react';
import LoginForm from '@/components/LoginForm';
import { useModalStore } from '@/store/useModalStore';

const LoginModal: React.FC = () => {

  const { isModalOpen, closeModal} = useModalStore();

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      {/* Capa de fondo borroso */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={() => closeModal()} // Cierra el modal al hacer clic en el fondo
      ></div>
      {/* Contenido del modal */}
      <div className="fixed inset-0 flex justify-center items-center z-50">     
           <LoginForm/>
      </div>
    </div>
  );
};

export default LoginModal;
