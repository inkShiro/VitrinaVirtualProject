import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    privacy: boolean; // Nueva propiedad para indicar si el proyecto es privado o público
  };
  viewMode: 'grid' | 'list';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, viewMode }) => {
  const cardColorClass = project.privacy ? 'bg-gray-100' : 'bg-blue-100'; // Cambio de color de la tarjeta
  const labelClass = project.privacy ? 'text-red-600' : 'text-green-600'; // Cambio de color de la etiqueta
  const descriptionBoxClass = project.privacy ? 'bg-gray-200' : 'bg-blue-200'; // Oscurecer el box de la descripción

  return (
    <Link
      href={`/dashboard/projects/${project.id}`}
      className={`relative border p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 ${cardColorClass} ${
        viewMode === 'list' ? 'w-full' : 'w-full max-h-48'
      }`}
    >
      <div className="absolute top-2 right-2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors">
        <FaArrowRight />
      </div>

      {/* Limitar el título con overflow y truncarlo */}
      <h4 className="text-lg font-semibold mb-2 text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap">
        {project.title}
      </h4>

      {/* Oscurecer el color del box de la descripción y añadir margen inferior */}
      <div
        className={`p-2 rounded mb-8 ${descriptionBoxClass} ${
          viewMode === 'grid' ? 'max-h-24 overflow-hidden' : ''
        }`}
      >
        <p className="text-gray-700 text-sm line-clamp-2 overflow-hidden text-ellipsis">
          {project.description}
        </p>
      </div>

      {/* Contenedor para la etiqueta con margen adicional para evitar superposición */}
      <div className="absolute bottom-2 left-4">
        <span className={`text-sm font-semibold px-2 py-1 rounded ${labelClass}`}>
          {project.privacy ? 'Privado' : 'Público'}
        </span>
      </div>
    </Link>
  );
};
