"use client";
import React, { useState, useEffect } from 'react';
import { ProjectCard } from './ProjectCard';
import { FaTh, FaList, FaSync } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface Project {
  id: number;
  title: string;
  description: string;
  updatedAt: string;
  privacy: boolean;
}

interface AuthorProjectsListProps {
  projects: Project[];
  sessionId: string;
  userId: string;
  mode: 'simple' | 'complete'; // Modo simple o completo
}

const AuthorProjectsList: React.FC<AuthorProjectsListProps> = ({ projects, sessionId: sessionId, userId, mode }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [localProjects, setLocalProjects] = useState<Project[]>(projects);
  const [sortOrder, setSortOrder] = useState<'updatedAt' | 'title'>('updatedAt');
  const router = useRouter();

  // Determina el número de proyectos a mostrar según el modo
  const itemsPerPage = mode === 'simple' ? 3 : 6;

  // Ordena los proyectos
  const sortedProjects = [...localProjects].sort((a, b) => {
    if (sortOrder === 'updatedAt') {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  const displayedProjects = sortedProjects.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const totalPages = Math.ceil(sortedProjects.length / itemsPerPage);

  // Guardar en localStorage solo cuando los proyectos se cargan por primera vez
  useEffect(() => {
    const storedProjects = localStorage.getItem(`authorProjects`);
    if (storedProjects) {
      setLocalProjects(JSON.parse(storedProjects));
    } else {
      localStorage.setItem(`authorProjects`, JSON.stringify(projects));
    }
  }, [projects, userId]);

  // Recargar los proyectos automáticamente al montar el componente
  useEffect(() => {
    handleReload(); // Llamar a handleReload cuando el componente se monta
  }, []);

  const handleReload = async () => {
    setLoading(true);
    try {
      const response = await fetch('${API_BASE_URL}/projects/author/${sessionId}');
      const updatedProjects = await response.json();
      setLocalProjects(updatedProjects);
      localStorage.setItem(`authorProjects`, JSON.stringify(updatedProjects));
    } catch (error) {
      console.error('Error recargando proyectos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-700">
          {mode === 'simple' ? 'Proyectos recientes como autor' : 'Todos tus proyectos'}
        </h3>
        {mode === 'complete' && (
          <div className="flex space-x-4">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-gray-100'}`}>
              <FaTh />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-gray-200' : 'bg-gray-100'}`}>
              <FaList />
            </button>
            <button onClick={handleReload} disabled={loading} className="p-2 rounded-md bg-gray-200">
              {loading ? <FaSync className="animate-spin" /> : 'Recargar'}
            </button>
          </div>
        )}
      </div>

      {/* Opciones de ordenación solo en modo completo */}
      {mode === 'complete' && (
        <div className="flex justify-end mb-4">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'updatedAt' | 'title')}
            className="p-2 bg-gray-100 border border-gray-300 rounded-md"
          >
            <option value="updatedAt">Última modificación</option>
            <option value="title">Orden alfabético</option>
          </select>
        </div>
      )}

      <div className={`grid ${viewMode === 'grid' ? 'grid-cols-3' : 'grid-cols-1'} gap-6`}>
        {displayedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} viewMode={viewMode} />
        ))}
      </div>

      {/* Botón para ver todos los proyectos en modo simple */}
      {mode === 'simple' && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => router.push('/dashboard/projects')}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Ver todos los proyectos
          </button>
        </div>
      )}

      {/* Paginación en modo completo */}
      {mode === 'complete' && localProjects.length > itemsPerPage && (
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            className="bg-blue-500 text-white py-2 px-4 rounded"
            disabled={currentPage === 0}
          >
            Anterior
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
            className="bg-blue-500 text-white py-2 px-4 rounded"
            disabled={currentPage === totalPages - 1}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthorProjectsList;
