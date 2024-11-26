"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Dashboard/Sidebar';
import StudentSummary from '../../components/Dashboard/Students/StudentSummary';
import CollaboratorProjectsList from '../../components/Dashboard/Students/CollaboratorProjectsList';
import AuthorProjectsList from '../../components/Dashboard/Students/AuthorProjectsList';
import LoadingSpinner from '@/components/Efectos/LoadingSpinner';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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

    const loadDataFromStorage = async () => {
      const cachedStudentData = localStorage.getItem('studentData');
      const cachedAdditionalData = localStorage.getItem('additionalData');
      const cachedAuthorProjects = localStorage.getItem('authorProjects');
      const cachedCollaboratorProjects = localStorage.getItem('collaboratorProjects');
      let cachedSessionId = localStorage.getItem('sessionId');

      if (!cachedSessionId) {
        console.log("No se encontró sessionId en el localStorage, realizando fetch...");
        const response = await fetch(`${API_BASE_URL}/students/user/${storedUserId}`);
        const data = await response.json();
        cachedSessionId = JSON.stringify(data.id);
        localStorage.setItem('sessionId', cachedSessionId);
      }

      if (cachedSessionId) {
        setSessionId(JSON.parse(cachedSessionId));
        console.log("Session ID establecido:", JSON.parse(cachedSessionId));
      }

      if (cachedStudentData) setStudentData(JSON.parse(cachedStudentData));
      if (cachedAdditionalData) setAdditionalData(JSON.parse(cachedAdditionalData));
      if (cachedAuthorProjects) setAuthorProjects(JSON.parse(cachedAuthorProjects));
      if (cachedCollaboratorProjects) setCollaboratorProjects(JSON.parse(cachedCollaboratorProjects));
    };

    loadDataFromStorage();
  }, []);

  useEffect(() => {
    if (!sessionId || !userId) return;

    const fetchData = async () => {
      try {
        if (!studentData) {
          const response = await fetch(`${API_BASE_URL}/students/user/${userId}`);
          const data = await response.json();
          setStudentData(data);
          localStorage.setItem('studentData', JSON.stringify(data));
          console.log("Datos del estudiante cargados:", data);
        }

        if (!additionalData) {
          const response = await fetch(`${API_BASE_URL}/users/${userId}`);
          const data = await response.json();
          setAdditionalData(data);
          localStorage.setItem('additionalData', JSON.stringify(data));
          console.log("Datos adicionales del usuario cargados:", data);
        }

        if (sessionId) { // Verificamos que sessionId no sea null antes de usarlo
          if (!authorProjects) {
            const response = await fetch(`${API_BASE_URL}/projects/author/${sessionId}`);
            const projects = await response.json();
            setAuthorProjects(projects);
            localStorage.setItem('authorProjects', JSON.stringify(projects));
            console.log("Proyectos de autor cargados:", projects);
          }

          if (!collaboratorProjects) {
            const response = await fetch(`${API_BASE_URL}/projects/collaborator/${sessionId}`);
            const projects = await response.json();
            setCollaboratorProjects(projects);
            localStorage.setItem('collaboratorProjects', JSON.stringify(projects));
            console.log("Proyectos de colaborador cargados:", projects);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [sessionId, studentData, additionalData, authorProjects, collaboratorProjects, userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

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
                projects={collaboratorProjects || []}
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