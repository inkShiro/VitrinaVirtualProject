"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/Dashboard/Sidebar';
import CollaboratorProjectsList from '../../../components/Dashboard/Students/CollaboratorProjectsList';
import AuthorProjectsList from '../../../components/Dashboard/Students/AuthorProjectsList';
import LoadingSpinner from '@/components/Efectos/LoadingSpinner';

const ProjectList = () => {
  const [userType, setUserType] = useState<"Estudiante" | "Empresa">("Estudiante");
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
      let cachedSessionId = localStorage.getItem(`sessionId`);

      if (!cachedSessionId) {
        console.log("No se encontró sessionId en el localStorage, realizando fetch...");
        const response = await fetch(`http://localhost:4000/api/students/user/${storedUserId}`);
        const data = await response.json();
        cachedSessionId = JSON.stringify(data.id);
        localStorage.setItem(`sessionId`, cachedSessionId);
      }

      setSessionId(JSON.parse(cachedSessionId));
      console.log("Session ID establecido:", JSON.parse(cachedSessionId));

      const cachedAuthorProjects = localStorage.getItem(`authorProjects`);
      const cachedCollaboratorProjects = localStorage.getItem(`collaboratorProjects`);

      if (cachedAuthorProjects) setAuthorProjects(JSON.parse(cachedAuthorProjects));
      if (cachedCollaboratorProjects) setCollaboratorProjects(JSON.parse(cachedCollaboratorProjects));
    };

    loadDataFromStorage();
  }, []);

  useEffect(() => {
    if (!sessionId || !userId) return;

    const fetchData = async () => {
      try {
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

    fetchData();
  }, [sessionId, userId, authorProjects, collaboratorProjects]);

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
      <div className="ml-48 p-8 w-full bg-gray-100">
        <div className="max-w-4xl w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">
              {userType === "Estudiante" ? 'Proyectos' : 'Proyectos como Empresa'}
            </h2>
          </div>

          {userType === "Estudiante" && (
            <div className="space-y-6">
              <AuthorProjectsList
                projects={authorProjects || []}
                sessionId={sessionId || ''}
                userId={userId || ''}
                mode="complete" 
              />
              <CollaboratorProjectsList 
                projects={collaboratorProjects || []}
                sessionId={sessionId || ''}
                userId={userId || ''}
                mode="complete" 
              />
            </div>
          )}

          {/* Aquí podrías agregar la vista de empresa, si es necesario */}
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
