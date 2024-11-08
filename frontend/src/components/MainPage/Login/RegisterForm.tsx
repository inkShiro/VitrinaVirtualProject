// src/components/RegisterForm.tsx
import React, { useState } from 'react';
import Notification from '../../Efectos/Notification'; // Asegúrate de que la ruta a Notification sea correcta

export default function RegisterForm() {
  const [isChecked, setIsChecked] = useState(false);
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'error' } | null>(null);
  const [userType, setUserType] = useState<'student' | 'company' | null>(null); // Tipo de usuario seleccionado

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const showNotification = (message: string, type: 'error') => {
    setNotification({ message, type });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isChecked) {
      showNotification('Debes aceptar los Términos y Condiciones', 'error');
      return;
    }

    if (password.length < 8 || password.length > 12) {
      showNotification('La contraseña debe tener entre 8 y 12 caracteres', 'error');
      return;
    }

    console.log('Formulario enviado');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!userType ? (
        <div className="flex justify-around my-4">
          <button
            type="button"
            onClick={() => setUserType('student')}
            className="w-40 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Soy Estudiante
          </button>
          <button
            type="button"
            onClick={() => setUserType('company')}
            className="w-40 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Soy Empresa
          </button>
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="Nombre Completo"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="email"
            placeholder="Correo Electrónico"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={handlePasswordChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          {/* Campos adicionales para Estudiantes */}
          {userType === 'student' && (
            <div className="space-y-4 transition-all duration-500 ease-in-out">
              <input type="text" placeholder="Carrera o Programa de Estudio" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600" />
              <input type="text" placeholder="Universidad o Institución" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600" />
              <select className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600">
                <option value="">Nivel de Estudios</option>
                <option value="undergraduate">Pregrado</option>
                <option value="postgraduate">Posgrado</option>
                <option value="doctorate">Doctorado</option>
              </select>
              <input type="text" placeholder="Intereses Académicos" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600" />
              <input type="text" placeholder="País o Ciudad" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600" />
              <input type="date" placeholder="Fecha de Nacimiento (opcional)" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600" />
              <input type="url" placeholder="Enlace a Portafolio o LinkedIn (opcional)" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600" />
            </div>
          )}

          {/* Campos adicionales para Empresas */}
          {userType === 'company' && (
            <div className="space-y-4 transition-all duration-500 ease-in-out">
              <select className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600">
                <option value="">Sector o Industria</option>
                <option value="technology">Tecnología</option>
                <option value="health">Salud</option>
                <option value="education">Educación</option>
              </select>
              <select className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600">
                <option value="">Tamaño de la Empresa</option>
                <option value="startup">Startup</option>
                <option value="small">Pequeña</option>
                <option value="medium">Mediana</option>
                <option value="large">Grande</option>
              </select>
              <input type="text" placeholder="Ubicación (País o Ciudad)" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600" />
              <input type="url" placeholder="Página Web de la Empresa" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600" />
              <textarea placeholder="Descripción de la Empresa" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600" />
              <input type="text" placeholder="Rol Principal del Contacto" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600" />
              <input type="text" placeholder="Expectativas de Colaboración (opcional)" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600" />
            </div>
          )}

          <div className="flex items-center space-x-2 mt-4">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 focus:ring-0"
            />
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Acepto los <span className="font-bold">Términos y Condiciones</span>
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Registrarse
          </button>

          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
              onClose={hideNotification}
            />
          )}
        </>
      )}
    </form>
  );
}
