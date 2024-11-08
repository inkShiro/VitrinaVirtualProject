// src/components/Notification.tsx
import React, { useState, useEffect } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  duration?: number; // Duración opcional para la notificación
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Cierra la notificación después del tiempo especificado
    }, duration);

    return () => clearTimeout(timer); // Limpia el timer al desmontar el componente
  }, [duration, onClose]);

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-md shadow-lg text-white ${
        type === 'success' ? 'bg-green-600' : 'bg-red-600'
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="text-xl font-bold ml-2">&times;</button>
      </div>
    </div>
  );
};

export default Notification;
