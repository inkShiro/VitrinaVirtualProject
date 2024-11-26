import React, { useEffect, useState } from 'react';
import FileViewer from '@/components/Dashboard/projects/FileViewer';
import { useRouter } from 'next/navigation';

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

interface ProjectDetailsContentProps {
  project: Project;
  canEdit: boolean;
  canView: boolean;
  onEdit: () => void;
}

const ProjectDetailsContent: React.FC<ProjectDetailsContentProps> = ({
  project,
  canEdit,
  canView,
  onEdit,
}) => {

  const router = useRouter(); // Importamos el hook de navegación

  const [collaborators, setCollaborators] = useState<{
    userId: string;
    fullName: string;
    institution: string;
    profilePicture: string | null;
  }[]>([]);
  const [authorName, setAuthorName] = useState<string>('');

  useEffect(() => {
    const fetchAuthorName = async () => {
      try {
        const userResponse = await fetch('${API_BASE_URL}/users/${project.author.userId}');
        const userData = await userResponse.json();

        if (userData && userData.fullName) {
          setAuthorName(userData.fullName);
        } else {
          console.error('No user data found for author');
        }
      } catch (error) {
        console.error('Error fetching author name:', error);
      }
    };

    const fetchCollaborators = async () => {
      const collaboratorDetails: {
        userId: string;
        fullName: string;
        institution: string;
        profilePicture: string | null;
      }[] = [];
      try {
        for (const collaborator of project.collaborators) {
          const userResponse = await fetch('${API_BASE_URL}/users/${collaborator.userId}');
          const userData = await userResponse.json();

          if (userData && userData.fullName) {
            collaboratorDetails.push({
              userId: userData.userId,
              fullName: userData.fullName,
              institution: collaborator.institution,
              profilePicture: collaborator.profilePicture,
            });
          } else {
            console.error('No user data found for collaborator', collaborator.userId);
          }
        }
        setCollaborators(collaboratorDetails);
      } catch (error) {
        console.error('Error fetching collaborator data:', error);
      }
    };

    fetchAuthorName();
    fetchCollaborators();
  }, [project.author.userId, project.collaborators]);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mt-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4 py-2">{project.title}</h1>
      <p className="text-lg text-gray-700 mb-6">{project.description}</p>

      {/* Files Section */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-lg text-gray-800 py-2">Documentos:</h3>
        {project.files.length > 0 ? (
          // Mapeamos project.files para incluir un id (puedes usar cualquier identificador único si no tienes uno)
          <FileViewer 
            fileUrls={project.files.map((file, index) => ({ id: `${index}`, url: file.fileUrl }))}
            mode="onlyView"  
          />
        ) : (
          <p className="text-gray-600">No hay archivos</p>
        )}
      </div>

      {/* License */}
      {project.license && (
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <span className="font-semibold text-lg text-gray-800 py-2">Licencia:</span>
          <p className="text-gray-600">{project.license}</p>
        </div>
      )}

      {/* Categories */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-lg text-gray-800 py-2">Categorías:</h3>
        <div className="flex flex-wrap gap-2">
          {project.categories.length > 0 ? (
            project.categories.map((category) => (
              <span
                key={category.id}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {category.name}
              </span>
            ))
          ) : (
            <p className="text-gray-600">No hay categorías</p>
          )}
        </div>
      </div>

      {/* Author Details */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-xl text-gray-800 py-2">Autor:</h3>
        <div className="flex items-center mb-2">
          <img
            src={project.author.profilePicture || "/recourses/icons/profile_icon.svg"}
            onError={(e) => (e.currentTarget.src = "/recourses/icons/profile_icon.svg")}
            alt="Autor"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <p className="font-medium text-gray-700">{authorName || 'Cargando...'}</p>
            <p className="text-sm text-gray-500">{project.author.institution}</p>
          </div>
        </div>
      </div>

      {/* Collaborators List */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-lg text-gray-800 py-2">Colaboradores:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {collaborators.length > 0 ? (
            collaborators.map((collaborator, index) => (
              <div key={index} className="flex items-center mb-2 text-gray-600">
                <img
                  src={collaborator.profilePicture || "/recourses/icons/profile_icon.svg"}
                  onError={(e) => (e.currentTarget.src = "/recourses/icons/profile_icon.svg")}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-medium">{collaborator.fullName}</p>
                  <p className="text-sm text-gray-500">{collaborator.institution}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No hay colaboradores</p>
          )}
        </div>
      </div>

      {/* Privacy Status */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <span className={`font-semibold text-lg ${project.privacy ? 'text-red-600' : 'text-green-600'}`}>
          {project.privacy ? 'Privado' : 'Público'}
        </span>
      </div>

      {/* Edit Button */}
      {canView ? (
        <div className="mt-4 flex justify-end">
          {canEdit && (
            <button
              onClick={() => router.push(`/dashboard/projects/${project.id}/edit`)} // Navegación dinámica
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Editar Proyecto
            </button>
          )}
        </div>
      ) : (
        <p className="mt-4 text-red-600">No tienes acceso a este proyecto.</p>
      )}
    </div>
  );
};

export default ProjectDetailsContent;
