// src/components/RegisterForm.tsx
import React, { useState } from 'react';
import Notification from '../../Efectos/Notification'; // Asegúrate de que la ruta a Notification sea correcta

export default function RegisterForm() {
  const [isChecked, setIsChecked] = useState(false);
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'error' | 'success'; } | null>(null);
  const [userType, setUserType] = useState<'student' | 'company' | null>(null); // Tipo de usuario seleccionado
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  // Estado de los campos adicionales según el tipo de usuario
  const [additionalData, setAdditionalData] = useState<any>({
    // Estudiante
    studyProgram: '',
    institution: '',
    educationLevel: '',
    academicInterests: '',
    location: '',
    birthDate: '',
    portfolioUrl: '',
    // Empresa
    sector: '',
    companySize: '',
    companyLocation: '',
    companyWebsite: '',
    companyDescription: '',
    contactRole: '',
    collaborationGoals: ''
  });

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const showNotification = (message: string, type: 'error' | 'success') => {
    setNotification({ message, type });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  // Función para verificar el estado del módulo
const checkModuleStatus = async () => {
  try {
    const response = await fetch('http://localhost:4000/api/modules/status/Login', {
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

// Función handleSubmit con verificación del estado del módulo
const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();

  // Verificar si el módulo está activo
  const isModuleActive = await checkModuleStatus();
  if (!isModuleActive) {
    showNotification('El módulo de registro no se encuentra disponible', 'error');
    return;
  }

  if (!isChecked) {
    showNotification('Debes aceptar los Términos y Condiciones', 'error');
    return;
  }

  if (password.length < 8 || password.length > 12) {
    showNotification('La contraseña debe tener entre 8 y 12 caracteres', 'error');
    return;
  }

  // Crear el objeto con los datos a enviar
  const userData = {
    email,
    password,
    fullName,
    userType,
    additionalData: userType === 'student' ? {
      studyProgram: additionalData.studyProgram,
      institution: additionalData.institution,
      educationLevel: additionalData.educationLevel,
      academicInterests: additionalData.academicInterests,
      location: additionalData.location,
      birthDate: additionalData.birthDate,
      portfolioUrl: additionalData.portfolioUrl
    } : {
      industry: additionalData.sector, // Cambiar 'sector' por 'industry'
      companySize: additionalData.companySize,
      location: additionalData.companyLocation,
      websiteUrl: additionalData.companyWebsite,
      description: additionalData.companyDescription,
      contactRole: additionalData.contactRole,
      collaborationGoals: additionalData.collaborationGoals
    }
  };

  // Realizar la petición POST
  try {
    const response = await fetch('http://localhost:4000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const error = await response.json();
      showNotification(`Error: ${error.message}`, 'error');
      return;
    }

    const result = await response.json();
    showNotification('Registro exitoso. ¡Bienvenido!', 'success');

    // Limpiar los campos del formulario
    setFullName('');
    setEmail('');
    setPassword('');
    setIsChecked(false);
    setUserType(null);
    setAdditionalData({
      studyProgram: '',
      institution: '',
      educationLevel: '',
      academicInterests: '',
      location: '',
      birthDate: '',
      portfolioUrl: '',
      sector: '',
      companySize: '',
      companyLocation: '',
      companyWebsite: '',
      companyDescription: '',
      contactRole: '',
      collaborationGoals: ''
    });

    // Recargar la página después del registro exitoso
    setTimeout(() => {
      window.location.reload();
    }, 1500); // 1.5 segundos para mostrar la notificación antes de recargar

  } catch (error) {
    showNotification('Error al registrar el usuario', 'error');
    console.error(error);
  }
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
            value={fullName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={handleEmailChange}
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
              <input
                type="text"
                placeholder="Carrera o Programa de Estudio"
                value={additionalData.studyProgram}
                onChange={(e) => setAdditionalData({ ...additionalData, studyProgram: e.target.value })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                placeholder="Universidad o Institución"
                value={additionalData.institution}
                onChange={(e) => setAdditionalData({ ...additionalData, institution: e.target.value })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <select
                value={additionalData.educationLevel}
                onChange={(e) => setAdditionalData({ ...additionalData, educationLevel: e.target.value })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">Nivel de Estudios</option>
                <option value="undergraduate">Pregrado</option>
                <option value="postgraduate">Posgrado</option>
                <option value="doctorate">Doctorado</option>
              </select>
              <input
                type="text"
                placeholder="Intereses Académicos"
                value={additionalData.academicInterests}
                onChange={(e) => setAdditionalData({ ...additionalData, academicInterests: e.target.value })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                placeholder="País o Ciudad"
                value={additionalData.location}
                onChange={(e) => setAdditionalData({ ...additionalData, location: e.target.value })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="date"
                placeholder="Fecha de Nacimiento (opcional)"
                value={additionalData.birthDate}
                onChange={(e) => setAdditionalData({ ...additionalData, birthDate: e.target.value })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="url"
                placeholder="Enlace a Portafolio o LinkedIn (opcional)"
                value={additionalData.portfolioUrl}
                onChange={(e) => setAdditionalData({ ...additionalData, portfolioUrl: e.target.value })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          )}

          {/* Campos adicionales para Empresas */}
          {userType === 'company' && (
            <div className="space-y-4 transition-all duration-500 ease-in-out">
              <select
                value={additionalData.sector}
                onChange={(e) => setAdditionalData({ ...additionalData, sector: e.target.value })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">Sector de la Empresa</option>
                <option value="tech">Tecnología</option>
                <option value="health">Salud</option>
                <option value="education">Educación</option>
                {/* Otros sectores */}
              </select>
              <input
                type="text"
                placeholder="Tamaño de la Empresa"
                value={additionalData.companySize}
                onChange={(e) => setAdditionalData({ ...additionalData, companySize: e.target.value })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                placeholder="Ubicación de la Empresa"
                value={additionalData.companyLocation}
                onChange={(e) => setAdditionalData({ ...additionalData, companyLocation: e.target.value })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="url"
                placeholder="Sitio Web de la Empresa"
                value={additionalData.companyWebsite}
                onChange={(e) => setAdditionalData({ ...additionalData, companyWebsite: e.target.value })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <textarea
                placeholder="Descripción de la Empresa"
                value={additionalData.companyDescription}
                onChange={(e) => setAdditionalData({ ...additionalData, companyDescription: e.target.value })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                placeholder="Rol de Contacto"
                value={additionalData.contactRole}
                onChange={(e) => setAdditionalData({ ...additionalData, contactRole: e.target.value })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <textarea
                placeholder="Objetivos de Colaboración"
                value={additionalData.collaborationGoals}
                onChange={(e) => setAdditionalData({ ...additionalData, collaborationGoals: e.target.value })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          )}

          {/* Términos y condiciones */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label htmlFor="terms">
              Acepto los <a href="/terms" className="text-blue-600">Términos y Condiciones</a>
            </label>
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Registrarse
          </button>
        </>
      )}
      {/* Notificación */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={hideNotification} // Pasamos el manejador para cerrar la notificación
        />
      )}
    </form>
  );
}
