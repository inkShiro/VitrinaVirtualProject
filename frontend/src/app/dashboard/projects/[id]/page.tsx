"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Sidebar from '../../../../components/Dashboard/Sidebar';
import LoadingSpinner from '../../../../components/Efectos/LoadingSpinner';
import ProjectDetailsContent from '../../../../components/Dashboard/ProjectDetailsContent';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Project {
  id: string;
  title: string;
  description: string;
  privacy: boolean;
  license: string;
  authorId: string;
  author: {
    userId: string;
    studyProgram: string;
    institution: string;
    educationLevel: string;
    academicInterests: string;
    location: string;
    birthDate: string;
    portfolioUrl: string;
    profilePicture: string | null;
  };
  collaborators: {
    userId: string;
    fullName: string;
    studyProgram: string;
    institution: string;
    educationLevel: string;
    academicInterests: string;
    location: string;
    birthDate: string;
    portfolioUrl: string;
    profilePicture: string | null;
  }[];
  categories: { id: string; name: string }[];
  files: { fileUrl: string }[];  // Modificado para que `files` sea un array de objetos con `fileUrl`
}

const ProjectDetails: React.FC = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [canEdit, setCanEdit] = useState(false);
  const [canView, setCanView] = useState(false);
  const [companyView, setCompanyView] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    const storedUserType = localStorage.getItem('accountType');
    console.log(storedUserType);
    
    if (!storedUserId) {
      return;
    }
    setUserId(storedUserId);
    setCompanyView(storedUserType === 'company');
  }, []);

  useEffect(() => {
    if (userId && id) {
      const projectId = Array.isArray(id) ? id[0] : id;
      fetchProjectDetails(projectId);
    }
  }, [userId, id]);

  const fetchProjectDetails = async (projectId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/projects/${projectId}`);
      if (!response.ok) {
        throw new Error('Proyecto no encontrado');
      }

      const data = await response.json();

      // Aquí creamos un id único para cada archivo
      const filesWithProperStructure = data.files.map((file: { fileUrl: string }, index: number) => ({
        id: index.toString(),  // Asignar un id único
        fileUrl: file.fileUrl,
      }));

      // Ahora obtener los nombres de los usuarios
      const collaboratorsWithNames = await fetchUserNames(data.collaborators);
      const authorWithName = await fetchUserNames([data.author]);

      setProject({
        ...data,
        files: filesWithProperStructure, // Asignar los archivos con la nueva estructura
        author: authorWithName[0],  // El autor es solo uno
        collaborators: collaboratorsWithNames,
      });

      validateAccess(data.author.userId, data.collaborators);
    } catch (error) {
      setError("Error al cargar los detalles del proyecto. Verifica el ID o intenta nuevamente.");
      setProject(null);
    } finally {
      setLoading(false);
    }
  };

  const validateAccess = (authorUserId: string, collaborators: { userId: string }[]) => {
    const normalizedUserId = String(userId);
    const normalizedAuthorId = String(authorUserId);

    if (normalizedUserId === normalizedAuthorId) {
      setCanEdit(true);
      setCanView(true);
    } else if (collaborators.some(collab => String(collab.userId) === normalizedUserId)) {
      setCanView(true);
      setCanEdit(false);
    } else {
      setCanView(false);
      setCanEdit(false);
    }
  };

  const fetchUserNames = async (users: { userId: string }[]) => {
    try {
      const userIds = users.map(user => user.userId);
      const response = await fetch(`${API_BASE_URL}/users?ids=${userIds.join(',')}`);

      const userData = await response.json();

      return users.map(user => {
        const userDetails = userData.find((u: { id: string }) => u.id === user.userId);
        return { ...user, fullName: userDetails?.fullName || 'Desconocido' };
      });
    } catch (error) {
      console.error('Error al obtener los nombres de los usuarios', error);
      return users;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!project) {
    return <p>Proyecto no encontrado</p>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow ml-20 p-6 bg-gray-100">
        <ProjectDetailsContent
          project={project}
          canEdit={canEdit}
          canView={canView}
          companyView={companyView} 
          onEdit={() => {
            alert('Redirigir a la página de edición del proyecto');
          }}
        />
      </div>
    </div>
  );
};

export default ProjectDetails;
