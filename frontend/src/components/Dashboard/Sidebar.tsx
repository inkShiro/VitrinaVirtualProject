"use client";
import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaUserCircle,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUpload,
  FaSearch ,
  FaComments,
  FaList,
} from "react-icons/fa";
import Link from "next/link";

interface SidebarProps {
  empresa_view?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ empresa_view = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleItems, setVisibleItems] = useState<boolean[]>([false, false, false, false, false, false]);
  const isEmpresaView = empresa_view;

  useEffect(() => {
    const savedExpandedState = localStorage.getItem("sidebarExpanded");
    if (savedExpandedState) {
      setIsExpanded(JSON.parse(savedExpandedState));
    }
  }, []);

  const toggleSidebar = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    localStorage.setItem("sidebarExpanded", JSON.stringify(newExpandedState));
  };

  useEffect(() => {
    if (isExpanded) {
      setVisibleItems([true, true, true, true, true, true]);
    } else {
      setVisibleItems([false, false, false, false, false, false]);
    }
  }, [isExpanded]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div
      className={`z-50 h-full fixed top-0 left-0 bg-gray-800 text-white transition-all duration-500 ease-in-out ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      <div className="p-4">
        <div className="flex items-center justify-center mb-8">
          {isExpanded ? (
            <h1 className="text-2xl font-bold transition-opacity duration-300 ease-in-out opacity-100">
              {isEmpresaView ? "Empresa" : "Dashboard"}
            </h1>
          ) : (
            <FaTachometerAlt className="text-3xl" />
          )}
        </div>

        <nav className="space-y-2">
          {/* Botones específicos de estudiante */}
          {!isEmpresaView && (
            <>
              <Link
                href="/dashboard"
                className="flex items-center p-2 rounded hover:bg-gray-700 transition-all duration-500 ease-in-out"
              >
                <FaHome className="text-3xl" />
                {isExpanded && visibleItems[0] && <span className="ml-3">Inicio</span>}
              </Link>
              <Link
                href="/dashboard/upload_projects"
                className="flex items-center p-2 rounded hover:bg-gray-700 transition-all duration-500 ease-in-out"
              >
                <FaUpload className="text-3xl" />
                {isExpanded && visibleItems[1] && <span className="ml-3">Subir Proyecto</span>}
              </Link>
              <Link
                href="/dashboard/projects"
                className="flex items-center p-2 rounded hover:bg-gray-700 transition-all duration-500 ease-in-out"
              >
                <FaList className="text-3xl" />
                {isExpanded && visibleItems[2] && <span className="ml-3">Lista de Proyectos</span>}
              </Link>
              <Link
                href="/dashboard_empresa/chat_empresa"
                className="flex items-center p-2 rounded hover:bg-gray-700 transition-all duration-500 ease-in-out"
              >
                <FaComments className="text-3xl" />
                {isExpanded && visibleItems[3] && <span className="ml-3">Chat</span>}
              </Link>
            </>
          )}

          {/* Botones específicos de empresa */}
          {isEmpresaView && (
            <>
              <Link
                href="/dashboard_empresa"
                className="flex items-center p-2 rounded hover:bg-gray-700 transition-all duration-500 ease-in-out"
              >
                <FaHome className="text-3xl" />
                {isExpanded && visibleItems[0] && <span className="ml-3">Inicio</span>}
              </Link>
              <Link
                href="/dashboard_empresa/explore_proyects"
                className="flex items-center p-2 rounded hover:bg-gray-700 transition-all duration-500 ease-in-out"
              >
                <FaSearch className="text-3xl" /> {/* Cambié el icono al de una lupa */}
                {isExpanded && visibleItems[2] && <span className="ml-3">Explorar Proyectos</span>}
              </Link>
              <Link
                href="/dashboard_empresa/chat_empresa"
                className="flex items-center p-2 rounded hover:bg-gray-700 transition-all duration-500 ease-in-out"
              >
                <FaComments className="text-3xl" /> {/* Cambiado a icono de chat */}
                {isExpanded && visibleItems[1] && <span className="ml-3">Chat</span>} {/* Cambiado el texto a "Chat" */}
              </Link>
            </>
          )}

          

          {/* Botón Cerrar Sesión (común) */}
          <button
            onClick={handleLogout}
            className="flex items-center p-2 rounded hover:bg-gray-700 w-full text-left transition-all duration-500 ease-in-out"
          >
            <FaSignOutAlt className="text-3xl" />
            {isExpanded && visibleItems[5] && <span className="ml-3">Cerrar sesión</span>}
          </button>
        </nav>

        <button
          onClick={toggleSidebar}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-2 rounded bg-gray-700 hover:bg-gray-600 text-xl"
        >
          {isExpanded ? "←" : "→"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
