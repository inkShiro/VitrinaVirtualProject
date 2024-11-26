import React from "react";

const ProjectTitleInput = ({ title, setTitle }: { title: string; setTitle: React.Dispatch<React.SetStateAction<string>> }) => (
  <div className="p-6 bg-white rounded-lg shadow-lg space-y-4">
    <label className="block text-lg font-semibold text-gray-700">Título del Proyecto</label>
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
      placeholder="Escribe el título del proyecto..."
    />
  </div>
);

export default ProjectTitleInput;
