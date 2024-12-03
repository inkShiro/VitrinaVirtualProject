// src/pages/ProfilePage.tsx
"use client";

import React, { useEffect, useState } from 'react';
import ProfileInfo from '../../../components/Dashboard/ProfileInfo';
import ProfileAvatar from '../../../components/Dashboard/ProfileAvatar';
import ProfileActions from '../../../components/Dashboard/ProfileActions';
import Sidebar from '../../../components/Dashboard/Sidebar';

const ProfilePage = () => {
  const [userType, setUserType] = useState<string>("");

  useEffect(() => {
    // Obtener el tipo de usuario desde localStorage
    const storedUserType = localStorage.getItem("accountType");
    if (storedUserType === "estudiante" || storedUserType === "company") {
      setUserType(storedUserType);
    }
  }, []);

  // Datos simulados en función del tipo de usuario
  const userData =
    userType === "estudiante"
      ? {
          fullName: "Juan Pérez",
          studyProgram: "Ingeniería de Software",
          institution: "Universidad Nacional",
          educationLevel: "Pregrado",
          academicInterests: "Inteligencia Artificial, Desarrollo Web",
          location: "Bogotá, Colombia",
          birthDate: "1998-08-15",
          portfolioUrl: "https://portafolio.com/juan",
        }
      : {
          fullName: "Tech Solutions S.A.",
          industry: "Tecnología",
          companySize: "51-200 empleados",
          location: "Medellín, Colombia",
          websiteUrl: "https://techsolutions.com",
          description: "Empresa dedicada al desarrollo de soluciones tecnológicas innovadoras.",
          contactRole: "Gerente de Proyectos",
          collaborationGoals: "Colaborar en proyectos de IA y automatización.",
        };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar condicional según el tipo de usuario */}
      <Sidebar empresa_view={userType === "company"} />

      <div className="flex-1 flex flex-col items-center p-8">
        <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
          <ProfileAvatar />

          {/* Información del perfil basada en el tipo de usuario */}
          {userType && <ProfileInfo userType={userType} userData={userData} />}

          <ProfileActions />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
