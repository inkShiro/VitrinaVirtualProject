import React, { useState } from 'react';
import Notification from '../../Efectos/Notification'; // Asegúrate de importar el componente de notificación

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Función para verificar el estado del módulo
const checkModuleStatus = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/modules/status/Login`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.isActive; // Asegúrate de que `isActive` sea el campo que indica el estado del módulo
  } catch (error) {
    console.error('Error verificando el estado del módulo:', error);
    return false; // Si ocurre un error, asumimos que el módulo no está activo
  }
};

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar si el módulo está activo antes de continuar con el inicio de sesión
    const isModuleActive = await checkModuleStatus();
    if (!isModuleActive) {
      setNotification({
        message: 'El módulo de inicio de sesión no está activo.',
        type: 'error'
      });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
    
      const data = await response.json();
    
      if (response.ok) {
        localStorage.clear();
    
        // Almacenar el token de acceso y el id del usuario
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user_id', data.user_id);
    
        // Verificar el tipo de perfil para redirigir correctamente
        const accountType = data.profile_type; // Asumimos que la API devuelve el tipo de perfil en "profile_type"
        localStorage.setItem('accountType', accountType); // Guardar el tipo de cuenta en localStorage
    
        console.log('Account Type:', accountType);
        console.log('Access Token:', localStorage.getItem('access_token'));
        console.log('User ID:', localStorage.getItem('user_id'));
    
        // Redirigir según el tipo de cuenta
        if (accountType === 'company') {
          window.location.href = '/dashboard_empresa';
        } else if (accountType === 'student') {
          window.location.href = '/dashboard';
        } else {
          throw new Error('Tipo de cuenta no reconocido');
        }
      } else {
        // Si hay un error en la autenticación
        setNotification({
          message: data.message || 'Hubo un error al iniciar sesión.',
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      setNotification({
        message: 'Hubo un problema al conectar con el servidor.',
        type: 'error',
      });
    }    
  };

  // Función para cerrar la notificación
  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <div>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <a href="#" className="text-sm text-blue-600 hover:underline">
          ¿Olvidaste tu contraseña?
        </a>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}
