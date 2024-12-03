"use client";

import React, { useEffect, useState } from "react";
import AuthorProjectsList from "@/components/Dashboard/Students/AuthorProjectsList";
import Sidebar from "@/components/Dashboard/Sidebar";

// Usamos una variable de entorno para la URL base de la API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const FetchProjects: React.FC = () => {
  // Estado para almacenar los proyectos y el estado de carga
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Identificadores de sesión y usuario (pueden provenir del contexto o ser de ejemplo)
  const sessionId = "session-id-ejemplo"; // Sustituye con el valor real si es necesario
  const userId = "user-id-ejemplo"; // Sustituye con el valor real si es necesario

  useEffect(() => {
    // Función para realizar la petición de los proyectos
    const fetchProjects = async () => {
      try {
        // Realizamos la solicitud a la API
        const response = await fetch(`${API_BASE_URL}/projects/`);
        
        if (!response.ok) {
          throw new Error('No se pudieron cargar los proyectos');
        }
        
        const projectsData = await response.json();
        setProjects(projectsData); // Establecemos los proyectos obtenidos
      } catch (err) {
        console.error("Error al realizar el fetch:", err);
      } finally {
        setIsLoading(false); // Indicamos que la carga ha finalizado
      }
    };

    fetchProjects(); // Llamamos a la función para obtener los proyectos
  }, []); // El array vacío asegura que solo se ejecute una vez al montar el componente

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar empresa_view={true} />

      {/* Contenido principal */}
      <div className="ml-64 w-full p-6">
        {isLoading ? (
          <p>Cargando proyectos...</p> // Mensaje de carga mientras se obtienen los datos
        ) : (
          <AuthorProjectsList
            projects={projects || []} // Pasamos los proyectos a la lista de proyectos
            sessionId={sessionId || ''} // Pasamos el sessionId
            userId={userId || ''} // Pasamos el userId
            mode="complete" // Indicamos el modo de visualización de los proyectos
            company={true || undefined} // Pasamos el companyId si está disponible (si no, lo dejamos como undefined)
          />
        )}
      </div>
    </div>
  );
};

export default FetchProjects;
