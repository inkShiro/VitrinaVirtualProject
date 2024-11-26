// src/app/not-found.tsx
"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const NotFoundPage: React.FC = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg border border-gray-200 max-w-lg mx-auto">
        <h1 className="text-6xl font-bold text-indigo-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Página no encontrada</h2>
        <p className="mb-6 text-gray-600">Lo sentimos, la página que buscas no existe o fue movida.</p>
        <button
          onClick={handleBackToHome}
          className="px-6 py-3 bg-indigo-500 text-white font-medium rounded-md shadow hover:bg-indigo-600 transition duration-200"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
