import React, { Dispatch, SetStateAction } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface Collaborator {
  id: string;
  fullName: string;
  university?: string;
  additionalInfo?: string;
  profilePicture?: string | null;
}

interface CollaboratorsProps {
  collaborators: Collaborator[];
  setCollaborators: Dispatch<SetStateAction<Collaborator[]>>;
  handleCollaboratorSearch: (name: string) => Promise<void>;
  handleCollaboratorSelect: (collaborator: Collaborator) => void;
  filteredUsers: Collaborator[];
  collaboratorSearch: string;
}

const Collaborators: React.FC<CollaboratorsProps> = ({
  collaborators,
  setCollaborators,
  handleCollaboratorSearch,
  handleCollaboratorSelect,
  filteredUsers,
  collaboratorSearch,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    handleCollaboratorSearch(searchTerm);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-4 border border-gray-200">
      <div className="mb-8">
        <label className="block text-2xl font-semibold text-gray-800 mb-2">Colaboradores</label>
        <input
          type="text"
          value={collaboratorSearch}
          onChange={handleSearchChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
          placeholder="Buscar colaboradores..."
        />
      </div>

      {filteredUsers.length > 0 && collaboratorSearch.trim() && (
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 space-y-4 mb-8">
          <h4 className="font-semibold text-lg text-gray-700">Resultados de búsqueda</h4>
          <ul>
            {filteredUsers.map((user) => (
              <motion.li
                key={user.id}
                className="flex items-center justify-between p-3 bg-white border border-gray-300 rounded-md shadow-sm mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  type="button"
                  onClick={() => {
                    handleCollaboratorSelect(user);
                  }}
                  className="flex items-center w-full"
                >
                  <img
                    src={user.profilePicture || "/recourses/icons/profile_icon.svg"}
                    alt="Perfil"
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{user.fullName}</p>
                    {user.university && (
                      <p className="text-sm text-gray-600">{user.university}</p>
                    )}
                  </div>
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      {/* Colaboradores seleccionados */}
      {collaborators.length > 0 && (
        <ul className="space-y-4">
          <AnimatePresence>
            {collaborators.map((collaborator) => (
              <motion.li
                key={collaborator.id}
                className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-md p-4 shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center">
                  {/* Imagen de perfil */}
                  <img
                    src={collaborator.profilePicture || "/recourses/icons/profile_icon.svg"}
                    alt="Profile"
                    className="w-14 h-14 rounded-full bg-gray-300 mr-4"
                  />
                  <div className="flex flex-col">
                    <span className="text-blue-700 font-medium">{collaborator.fullName}</span>
                    {collaborator.university && (
                      <span className="text-sm text-gray-600">{collaborator.university}</span>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCollaborators((prev) => prev.filter(c => c.id !== collaborator.id));
                  }}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <FaTrashAlt />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
};

export default Collaborators;
