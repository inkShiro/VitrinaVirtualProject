// src/pages/ProjectListPage.tsx
import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Sidebar from "../../../components/Dashboard/Sidebar"; // Asegúrate de importar el Sidebar

interface Project {
  title: string;
  description: string;
  privacy: "Público" | "Privado";
  date: string;
}

const projects: Project[] = [
  { title: "Proyecto de IA", description: "Un proyecto sobre inteligencia artificial", privacy: "Público", date: "2024-10-05" },
  { title: "Investigación en Biología", description: "Investigación sobre genética", privacy: "Privado", date: "2024-10-10" },
];

const ProjectListPage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido Principal */}
      <div className="ml-64 p-8 w-full">
        <h2 className="text-3xl font-bold mb-6">Mis Proyectos</h2>
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-md">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-300 rounded-md mr-4"></div>
                <div>
                  <h4 className="text-lg font-bold">{project.title}</h4>
                  <p className="text-sm text-gray-500">{project.description}</p>
                  <div className="flex items-center space-x-2">
                    <span className={project.privacy === "Público" ? "text-green-600" : "text-red-600"}>
                      {project.privacy}
                    </span>
                    <span className="text-sm text-gray-400">| {project.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4">
                <button className="text-blue-600">
                  <FaEdit />
                </button>
                <button className="text-red-600">
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectListPage;
