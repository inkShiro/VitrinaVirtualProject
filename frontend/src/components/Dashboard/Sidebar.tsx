"use client";
import React, { useState } from 'react';
import { FaHome, FaProjectDiagram, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const router = useRouter();

  const toggleProjectsMenu = () => {
    setIsProjectsOpen(!isProjectsOpen);
  };

  const handleLogout = () => {
    // Borrar el dato de localStorage
    localStorage.removeItem('accountType');
    // Redirigir a la página principal
    router.push('/');
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-full fixed">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

        <nav className="space-y-4">
          <Link href="/dashboard" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700">
            <FaHome />
            <span>Inicio</span>
          </Link>

          <div>
            <button
              onClick={toggleProjectsMenu}
              className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700 w-full text-left"
            >
              <FaProjectDiagram />
              <span>Proyectos</span>
            </button>
            {isProjectsOpen && (
              <div className="ml-4 mt-2 space-y-2">
                <Link href="/dashboard/upload_projects" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700">
                  <span>Subir Proyecto</span>
                </Link>
                <Link href="/dashboard/projects_list" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700">
                  <span>Mis Proyectos</span>
                </Link>
              </div>
            )}
          </div>

          <Link href="/dashboard/profile" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700">
            <FaUserCircle />
            <span>Perfil</span>
          </Link>

          {/* Botón de Cerrar sesión */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700 w-full text-left"
          >
            <FaSignOutAlt />
            <span>Cerrar sesión</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
