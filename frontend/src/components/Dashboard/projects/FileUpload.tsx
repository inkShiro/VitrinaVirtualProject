"use client"
import React, { useState } from "react";
import { FiUpload } from "react-icons/fi"; // Usamos FiUpload en lugar de FiCloudUpload

interface FileUploadProps {
  handleFileChange: (files: File[]) => void; // Cambié a un arreglo de archivos directamente
}

const FileUpload: React.FC<FileUploadProps> = ({ handleFileChange }) => {
  const [files, setFiles] = useState<File[]>([]); // Almacena los archivos seleccionados
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    // Trigger the file input click when the user clicks on the drop area
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);
      setFiles(fileArray); // Actualiza el estado con los archivos seleccionados
      handleFileChange(fileArray); // Llamada a la función que viene desde los props
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg space-y-4">
      <label className="block text-2xl font-semibold text-gray-800">Cargar Archivos</label>
      <div
        onClick={handleClick}
        className="flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-md p-6 hover:bg-gray-200 cursor-pointer transition-colors duration-300"
      >
        <FiUpload className="text-4xl text-blue-600 mb-4" />
        <p className="text-gray-700 text-lg">Haz clic para seleccionar los archivos.</p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelect}
        multiple
        className="hidden" // Mantenemos el input oculto
      />
      <p className="text-sm text-gray-500">
        Puedes seleccionar varios archivos a la vez. Los formatos permitidos son .jpg, .png, .pdf, etc.
      </p>

      {/* Mostrar archivos seleccionados */}
      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">Archivos seleccionados:</h3>
          <ul className="space-y-2 mt-2">
            {files.map((file, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                <span className="text-gray-700">{file.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
