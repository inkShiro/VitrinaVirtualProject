import React from "react";

interface ProjectDescriptionInputProps {
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

const ProjectDescriptionInput: React.FC<ProjectDescriptionInputProps> = ({ description, setDescription }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg space-y-4">
      <label className="block text-lg font-semibold text-gray-700">Descripción</label>

      {/* Campo de texto para la descripción */}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
        placeholder="Escribe una descripción detallada del proyecto."
        rows={6}
      />

      <p className="text-sm text-gray-500">Escribe una descripción detallada del proyecto.</p>
    </div>
  );
};

export default ProjectDescriptionInput;
