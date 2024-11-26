"use client";
import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaUserCircle,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUpload,
  FaList,
  FaComments,
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHomeVisible, setIsHomeVisible] = useState(false);
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const [isListVisible, setIsListVisible] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedExpandedState = localStorage.getItem("sidebarExpanded");
    if (savedExpandedState) {
      setIsExpanded(JSON.parse(savedExpandedState));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Limpia todo el contenido de localStorage
    window.location.href = "/"; // Redirige y recarga la página de inicio
  };

  const toggleSidebar = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    localStorage.setItem("sidebarExpanded", JSON.stringify(newExpandedState));
  };

  useEffect(() => {
    if (isExpanded) {
      setTimeout(() => setIsHomeVisible(true), 200);
      setTimeout(() => setIsUploadVisible(true), 250);
      setTimeout(() => setIsListVisible(true), 300);
      setTimeout(() => setIsChatVisible(true), 350);
      setTimeout(() => setIsProfileVisible(true), 400);
      setTimeout(() => setIsLogoutVisible(true), 450);
    } else {
      setIsHomeVisible(false);
      setIsUploadVisible(false);
      setIsListVisible(false);
      setIsChatVisible(false);
      setIsProfileVisible(false);
      setIsLogoutVisible(false);
    }
  }, [isExpanded]);

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
              Dashboard
            </h1>
          ) : (
            <FaTachometerAlt className="text-3xl" />
          )}
        </div>

        <nav className="space-y-2">
          {/* Botón Inicio */}
          <Link
            href="/dashboard"
            className="flex items-center p-2 rounded hover:bg-gray-700 transition-all duration-500 ease-in-out"
          >
            <FaHome className="text-3xl" />
            {isExpanded && isHomeVisible && <span className="ml-3">Inicio</span>}
          </Link>

          {/* Botón Subir Proyecto */}
          <Link
            href="/dashboard/upload_projects"
            className="flex items-center p-2 rounded hover:bg-gray-700 transition-all duration-500 ease-in-out"
          >
            <FaUpload className="text-3xl" />
            {isExpanded && isUploadVisible && (
              <span className="ml-3">Subir Proyecto</span>
            )}
          </Link>

          {/* Botón Lista de Proyectos */}
          <Link
            href="/dashboard/projects"
            className="flex items-center p-2 rounded hover:bg-gray-700 transition-all duration-500 ease-in-out"
          >
            <FaList className="text-3xl" />
            {isExpanded && isListVisible && (
              <span className="ml-3">Lista de Proyectos</span>
            )}
          </Link>

          {/* Botón Chat */}
          <Link
            href="/dashboard/chat"
            className="flex items-center p-2 rounded hover:bg-gray-700 transition-all duration-500 ease-in-out"
          >
            <FaComments className="text-3xl" />
            {isExpanded && isChatVisible && <span className="ml-3">Chat</span>}
          </Link>

          {/* Botón Perfil */}
          <Link
            href="/dashboard/profile"
            className="flex items-center p-2 rounded hover:bg-gray-700 transition-all duration-500 ease-in-out"
          >
            <FaUserCircle className="text-3xl" />
            {isExpanded && isProfileVisible && (
              <span className="ml-3">Perfil</span>
            )}
          </Link>

          {/* Botón Cerrar Sesión */}
          <button
            onClick={handleLogout}
            className="flex items-center p-2 rounded hover:bg-gray-700 w-full text-left transition-all duration-500 ease-in-out"
          >
            <FaSignOutAlt className="text-3xl" />
            {isExpanded && isLogoutVisible && (
              <span className="ml-3">Cerrar sesión</span>
            )}
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
