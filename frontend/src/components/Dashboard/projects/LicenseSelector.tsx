import React from "react";

interface LicenseOption {
  id: string;
  name: string;
  description: string;
}

interface LicenseSelectorProps {
  licenseOptions: LicenseOption[]; // Arreglo de opciones con id, nombre y descripción
  selectedLicense: string | null; // El id de la licencia seleccionada
  setSelectedLicense: (licenseName: string) => void; // Acepta el nombre de la licencia
}

const LicenseSelector: React.FC<LicenseSelectorProps> = ({
  licenseOptions,
  selectedLicense,
  setSelectedLicense,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value; // Obtiene el id seleccionado
    const selectedOption = licenseOptions.find(option => option.id === selectedId);
    if (selectedOption) {
      setSelectedLicense(selectedOption.name); // Pasa el nombre de la licencia
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg space-y-4">
      <label className="block text-lg font-semibold text-gray-700">Licencia</label>
      <select
        value={selectedLicense ? licenseOptions.find(option => option.name === selectedLicense)?.id || "" : ""}
        onChange={handleChange}
        className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
      >
        <option value="" disabled>Selecciona una opción</option>
        {licenseOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name} - {option.description}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LicenseSelector;
