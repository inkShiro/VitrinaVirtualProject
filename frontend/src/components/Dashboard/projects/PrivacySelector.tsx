import React, { useEffect, useState } from "react";

interface PrivacyOption {
  id: string;
  name: string;
}

interface PrivacySelectorProps {
  privacyOptions: PrivacyOption[];
  selectedPrivacy: PrivacyOption | null;
  setSelectedPrivacy: (privacy: PrivacyOption) => void;
  initialSelectedId?: string; // Nuevo prop opcional para el ID inicial
}

const PrivacySelector: React.FC<PrivacySelectorProps> = ({
  privacyOptions,
  selectedPrivacy,
  setSelectedPrivacy,
  initialSelectedId,
}) => {
  const [isInitialSet, setIsInitialSet] = useState(false); // Nueva bandera

  useEffect(() => {
    if (
      initialSelectedId &&
      !isInitialSet && // Solo ejecuta si aún no se ha configurado
      (!selectedPrivacy || selectedPrivacy.id !== initialSelectedId)
    ) {
      const initialOption = privacyOptions.find(
        (option) => option.id === initialSelectedId
      );
      if (initialOption) {
        setSelectedPrivacy(initialOption);
        setIsInitialSet(true); // Marca como configurado
      }
    }
  }, [initialSelectedId, privacyOptions, selectedPrivacy, isInitialSet, setSelectedPrivacy]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg space-y-4">
      <label className="block text-lg font-semibold text-gray-700">Privacidad</label>
      <select
        value={selectedPrivacy?.id || ""}
        onChange={(e) => {
          const selected = privacyOptions.find(
            (option) => option.id === e.target.value
          );
          if (selected) setSelectedPrivacy(selected); // Actualiza según selección del usuario
        }}
        className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
      >
        <option value="" disabled className="text-gray-500">
          Selecciona una opción
        </option>
        {privacyOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PrivacySelector;
