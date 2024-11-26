"use client";
import React, { useState, useEffect } from 'react';
import { FaTh, FaList, FaSync } from 'react-icons/fa';
import { ProjectCard } from './ProjectCard';

interface Project {
  id: number;
  title: string;
  description: string;
  privacy: boolean;
  updatedAt: string; // Supón que añades esta propiedad
}

interface CollaboratorProjectsListProps {
  projects: Project[];
  sessionId: string;
  userId: string;
  mode: 'simple' | 'complete';
}

const CollaboratorProjectsList: React.FC<CollaboratorProjectsListProps> = ({ projects, sessionId: sessionId, userId, mode }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [localProjects, setLocalProjects] = useState<Project[]>(projects);
  const [sortOrder, setSortOrder] = useState<'updatedAt' | 'title'>('updatedAt');

  const itemsPerPage = mode === 'simple' ? 3 : 6;
  const totalPages = Math.ceil(localProjects.length / itemsPerPage);

  useEffect(() => {
    const storedProjects = localStorage.getItem(`collaboratorProjects`);
    if (storedProjects) {
      setLocalProjects(JSON.parse(storedProjects)); // Usa los proyectos almacenados
    } else {
      fetchCollaboratorProjects(); // Si no hay proyectos en el localStorage, recarga los proyectos
    }
  }, [userId]);

  const fetchCollaboratorProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/projects/collaborator/${sessionId}`);
      const projects = await response.json();
      setLocalProjects(projects);
      localStorage.setItem(`collaboratorProjects`, JSON.stringify(projects)); // Guarda en el localStorage
    } catch (error) {
      console.error('Error al cargar los proyectos del colaborador:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortedProjects = [...localProjects].sort((a, b) => {
    if (sortOrder === 'updatedAt') {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
    return a.title.localeCompare(b.title);
  });

  const displayedProjects = sortedProjects.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-semibold">Proyectos como Colaborador</h4>
        <div className="flex space-x-4">
          <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-gray-300' : ''}`}>
            <FaTh className="text-gray-600" />
          </button>
          <button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-gray-300' : ''}`}>
            <FaList className="text-gray-600" />
          </button>
          <button onClick={fetchCollaboratorProjects} disabled={loading} className="p-2 rounded-md bg-gray-200">
            {loading ? <FaSync className="animate-spin" /> : 'Recargar'}
          </button>
          {mode === 'complete' && (
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'updatedAt' | 'title')} className="p-2 rounded-md bg-gray-200">
              <option value="updatedAt">Última Modificación</option>
              <option value="title">Orden Alfabético</option>
            </select>
          )}
        </div>
      </div>

      {displayedProjects.length > 0 ? (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4' : 'space-y-4'}>
          {displayedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} viewMode={viewMode} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-500 text-center">No tienes proyectos como colaborador.</p>
        </div>
      )}

      {mode === 'simple' ? (
        <div className="flex justify-center mt-6">
          <button onClick={() => window.location.href = '/dashboard/projects'} className="px-4 py-2 bg-blue-500 text-white rounded">
            Ver todos los proyectos
          </button>
        </div>
      ) : (
        totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))} className="px-4 py-2 bg-gray-200 rounded-l-md hover:bg-gray-300" disabled={currentPage === 0}>
              Anterior
            </button>
            <span className="px-4 py-2 bg-gray-100 text-gray-700">
              Página {currentPage + 1} de {totalPages}
            </span>
            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))} className="px-4 py-2 bg-gray-200 rounded-r-md hover:bg-gray-300" disabled={currentPage === totalPages - 1}>
              Siguiente
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default CollaboratorProjectsList;
