// src/components/AuthModal.tsx
import React, { useState } from 'react';
import AnimatedComponent from '../../Efectos/AnimatedComponent';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
          X
        </button>
        <AnimatedComponent>
          {isRegister ? (
            <>
              <RegisterForm />
              <p className="text-center mt-4">
                ¿Ya tienes una cuenta?{' '}
                <span
                  onClick={() => setIsRegister(false)}
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  Inicia sesión aquí
                </span>
              </p>
            </>
          ) : (
            <>
              <LoginForm />
              <p className="text-center mt-4">
                ¿Nuevo aquí?{' '}
                <span
                  onClick={() => setIsRegister(true)}
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  Regístrate aquí
                </span>
              </p>
            </>
          )}
        </AnimatedComponent>
      </div>
    </div>
  );
};

export default AuthModal;
