"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa'; // Importa el ícono de react-icons/fa
import RegisterForm from '../../components/MainPage/Login/RegisterForm';
import LoginForm from '../../components/MainPage/Login/LoginForm';

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false); // Cambiado a false para iniciar con el formulario de login
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      <button
        onClick={() => router.push('/')} // Navega a la página principal
        className="absolute top-4 left-4 bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition flex items-center space-x-2"
      >
        <FaArrowLeft /> {/* Ícono de flecha hacia la izquierda */}
        <span>Volver a la página principal</span>
      </button>
      
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
        </h1>
        
        {isRegistering ? <RegisterForm /> : <LoginForm />}

        <div className="mt-4 text-center">
          {isRegistering ? (
            <p>
              ¿Ya tienes una cuenta?{' '}
              <button
                onClick={() => setIsRegistering(false)}
                className="text-blue-600 hover:underline"
              >
                Iniciar Sesión
              </button>
            </p>
          ) : (
            <p>
              ¿No tienes una cuenta?{' '}
              <button
                onClick={() => setIsRegistering(true)}
                className="text-blue-600 hover:underline"
              >
                Registrarse
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
