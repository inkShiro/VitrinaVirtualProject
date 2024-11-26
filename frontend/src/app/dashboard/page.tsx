"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Dashboard/Sidebar';
import StudentSummary from '../../components/Dashboard/Students/StudentSummary';
import CollaboratorProjectsList from '../../components/Dashboard/Students/CollaboratorProjectsList';
import AuthorProjectsList from '../../components/Dashboard/Students/AuthorProjectsList';
import LoadingSpinner from '@/components/Efectos/LoadingSpinner';

const DashboardPage = () => {
  const [userType, setUserType] = useState<"Estudiante" | "Empresa">("Estudiante");
  const [studentData, setStudentData] = useState<any>(null);
  const [additionalData, setAdditionalData] = useState<any>(null);
  const [authorProjects, setAuthorProjects] = useState<any>(null);
  const [collaboratorProjects, setCollaboratorProjects] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const accountType = localStorage.getItem('accountType');
    const storedUserId = localStorage.getItem('user_id');
    if (!storedUserId) return; // Si no hay un ID de usuario almacenado, no continuamos.

    setUserId(storedUserId);
    setUserType(accountType === 'empresa' ? "Empresa" : "Estudiante");

    handleAccountTypeProcess();

    
  }, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  const loadDataFromStorage = async () => {
    const cachedStudentData = localStorage.getItem(`studentData`);
    const cachedAdditionalData = localStorage.getItem(`additionalData`);
    const cachedAuthorProjects = localStorage.getItem(`authorProjects`);
    const cachedCollaboratorProjects = localStorage.getItem(`collaboratorProjects`);
    let cachedSessionId = localStorage.getItem(`sessionId`);

    if (!cachedSessionId) {
      console.log("No se encontró sessionId en el localStorage, realizando fetch...");
      const response = await fetch(`http://localhost:4000/api/students/user/${userId}`);
      const data = await response.json();
      cachedSessionId = JSON.stringify(data.id);
      localStorage.setItem(`sessionId`, cachedSessionId);
    }

    setSessionId(JSON.parse(cachedSessionId));
    console.log("Session ID establecido:", JSON.parse(cachedSessionId));

    if (cachedStudentData) setStudentData(JSON.parse(cachedStudentData));
    if (cachedAdditionalData) setAdditionalData(JSON.parse(cachedAdditionalData));
    if (cachedAuthorProjects) setAuthorProjects(JSON.parse(cachedAuthorProjects));
    if (cachedCollaboratorProjects) setCollaboratorProjects(JSON.parse(cachedCollaboratorProjects));
  };

  if (!sessionId || !userId) return;

    const fetchData = async () => {
      try {
        if (!studentData) {
          const response = await fetch(`http://localhost:4000/api/students/user/${userId}`);
          const data = await response.json();
          setStudentData(data);
          setSessionId(data.id);
          localStorage.setItem(`studentData`, JSON.stringify(data));
          localStorage.setItem(`sessionId`, JSON.stringify(data.id));
          console.log("Datos del estudiante cargados:", data);
        }

        if (!additionalData) {
          const response = await fetch(`http://localhost:4000/api/users/${userId}`);
          const data = await response.json();
          setAdditionalData(data);
          localStorage.setItem(`additionalData`, JSON.stringify(data));
          console.log("Datos adicionales del usuario cargados:", data);
        }

        if (!authorProjects) {
          const response = await fetch(`http://localhost:4000/api/projects/author/${sessionId}`);
          const projects = await response.json();
          setAuthorProjects(projects);
          localStorage.setItem(`authorProjects`, JSON.stringify(projects));
          console.log("Proyectos de autor cargados:", projects);
        }

        if (!collaboratorProjects) {
          const response = await fetch(`http://localhost:4000/api/projects/collaborator/${sessionId}`);
          const projects = await response.json();
          setCollaboratorProjects(projects);
          localStorage.setItem(`collaboratorProjects`, JSON.stringify(projects));
          console.log("Proyectos de colaborador cargados:", projects);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

  const handleAccountTypeProcess = () => {
    if (userType === "Estudiante") {
      loadDataFromStorage();
      fetchData(), ([sessionId, studentData, additionalData, authorProjects, collaboratorProjects, userId]);
    } else if (userType === "Empresa") {
      // Procesos específicos para Empresa
    }
  };

  function getAllLocalStorageData(): Record<string, any> {
    const localStorageData: Record<string, any> = {};
  
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        try {
          // Intenta parsear el valor como JSON, de lo contrario, guarda como string
          const value = localStorage.getItem(key);
          localStorageData[key] = value ? JSON.parse(value) : null;
        } catch {
          // Si no se puede parsear como JSON, guarda el valor como string
          localStorageData[key] = localStorage.getItem(key);
        }
      }
    }
  
    return localStorageData;
  }
  
  // Ejemplo de uso
  const allData = getAllLocalStorageData();
  console.log(allData);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="ml-12 p-8 w-full bg-gray-100 flex justify-center items-center">
        <div className="max-w-4xl w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">
              {userType === "Estudiante" ? 'Dashboard Estudiante' : 'Dashboard Empresa'}
            </h2>
          </div>

          {userType === "Estudiante" ? (
            <div className="space-y-6">
              {studentData && additionalData ? (
                <StudentSummary
                  name={additionalData.fullName || "Juan Pérez"}
                  career={additionalData.studyProgram || "Ingeniería de Software"}
                  profileImage={additionalData.profilePicture || "/recourses/icons/profile_icon.svg"}
                  institution={studentData.institution || "Universidad Ejemplo"}
                />
              ) : (
                <p>No se encontraron datos del estudiante.</p>
              )}

              <AuthorProjectsList
                projects={authorProjects || []}
                sessionId={sessionId || ''}
                userId={userId || ''}
                mode="simple" 
              />
              <CollaboratorProjectsList 
                projects={authorProjects || []}
                sessionId={sessionId || ''}
                userId={userId || ''}
                mode="simple" 
              />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Vista de Empresa */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
