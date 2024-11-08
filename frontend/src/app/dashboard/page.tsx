"use client";

import React, { useState, useEffect } from 'react';
import { FaUser, FaProjectDiagram, FaEnvelope, FaCog, FaSearch } from 'react-icons/fa';
import Sidebar from '../../components/Dashboard/Sidebar';

const DashboardPage = () => {
  const [userType, setUserType] = useState<"Estudiante" | "Empresa">("Estudiante");

  useEffect(() => {
    // Obtener el tipo de cuenta desde localStorage
    const accountType = localStorage.getItem('accountType');
    if (accountType === 'empresa') {
      setUserType("Empresa");
    } else if (accountType === 'estudiante') {
      setUserType("Estudiante");
    }
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Sección Central */}
      <div className="ml-64 p-8 w-full bg-gray-100">
        {/* Título y Selector de Rol */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">
            {userType === "Estudiante" ? 'Dashboard Estudiante' : 'Dashboard Empresa'}
          </h2>
        </div>

        {/* Contenido basado en el tipo de usuario */}
        {userType === "Estudiante" ? (
          <div className="space-y-6">
            {/* Vista de Estudiante */}
            <div className="flex items-center space-x-4">
              <img src="/default-avatar.png" alt="Imagen de Perfil" className="w-16 h-16 rounded-full" />
              <div>
                <h3 className="font-bold">Juan Pérez</h3>
                <p>Carrera de Ingeniería</p>
              </div>
            </div>

            {/* Gráfico de Progreso de Proyectos */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold">Progreso de Proyectos</h4>
              <div className="flex items-center space-x-4 mt-4">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-blue-600 h-4 rounded-full" style={{ width: '50%' }}></div>
                </div>
                <span>50% Completo</span>
              </div>
            </div>

            {/* Lista de Proyectos */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h4 className="text-lg font-semibold">Mis Proyectos</h4>
              <div className="space-y-4 mt-4">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <img src="/project-thumbnail.png" alt="Proyecto" className="w-16 h-16 object-cover rounded" />
                    <div>
                      <h5 className="font-semibold">Proyecto de IA</h5>
                      <p className="text-sm text-gray-500">Estado: En revisión</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:underline">Editar</button>
                    <button className="text-red-600 hover:underline">Eliminar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Vista de Empresa */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold">Buscar Proyectos</h4>
              <div className="flex items-center mt-4 space-x-4">
                <input
                  type="text"
                  placeholder="Buscar proyectos..."
                  className="p-2 border rounded-lg w-64"
                />
                <div className="flex space-x-3">
                  <select className="p-2 border rounded-lg">
                    <option>Categoría</option>
                    <option>IA</option>
                    <option>Diseño</option>
                  </select>
                  <button className="bg-blue-600 text-white p-2 rounded-lg">
                    <FaSearch />
                  </button>
                </div>
              </div>
            </div>

            {/* Proyectos Disponibles */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h4 className="text-lg font-semibold">Proyectos Disponibles</h4>
              <div className="space-y-4 mt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="font-semibold">Desarrollo de Prototipo</h5>
                    <p className="text-sm text-gray-500">Requiere: IA, Prototipos</p>
                  </div>
                  <button className="text-blue-600 hover:underline">Ver Proyecto</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
