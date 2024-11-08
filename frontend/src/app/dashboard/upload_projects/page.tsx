"use client";

import React, { useState } from "react";
import { FaUpload, FaTrashAlt } from "react-icons/fa";
import { IoMdSave } from "react-icons/io";
import TitleInput from "../../../components/Students/UploadComponents/TitleInput";
import DescriptionInput from "../../../components/Students/UploadComponents/DescriptionInput";
import CategorySelect from "../../../components/Students/UploadComponents/CategorySelect";
import FileInput from "../../../components/Students/UploadComponents/FileInput";
import PrivacySelect from "../../../components/Students/UploadComponents/PrivacySelect";
import LicenseSelect from "../../../components/Students/UploadComponents/LicenseSelect";
import ProgressBar from "../../../components/Students/UploadComponents/ProgressBar";
import Sidebar from "../../../components/Dashboard/Sidebar";  // Asegúrate de importar el Sidebar

const UploadProjectPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoriesSelected, setCategoriesSelected] = useState<string[]>([]);
  const [tags, setTags] = useState("");
  const [privacy, setPrivacy] = useState("Público");
  const [license, setLicense] = useState("Licencia Creative Commons");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manejo de archivos
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  // Manejo de la subida del formulario
  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Proyecto subido exitosamente");
    }, 2000);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido de la página */}
      <div className="flex-1 p-8 bg-gray-100 ml-64"> {/* Aquí se añade un margen a la izquierda */}
        <h2 className="text-3xl font-bold mb-6">Formulario de Subida de Proyecto</h2>
        <form className="space-y-4 w-full max-w-lg">
          {/* Título del Proyecto */}
          <TitleInput value={title} onChange={(e) => setTitle(e.target.value)} />

          {/* Descripción */}
          <DescriptionInput value={description} onChange={(e) => setDescription(e.target.value)} />

          {/* Categorías */}
          <CategorySelect selectedCategories={categoriesSelected} onChange={setCategoriesSelected} />

          {/* Etiquetas */}
          <div>
            <label className="block text-sm font-medium">Etiquetas</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md"
            />
          </div>

          {/* Archivos Adjuntos */}
          <FileInput onChange={handleFileChange} />

          {/* Configuración de Privacidad */}
          <PrivacySelect value={privacy} onChange={(e) => setPrivacy(e.target.value)} />

          {/* Licencia */}
          <LicenseSelect value={license} onChange={(e) => setLicense(e.target.value)} />

          {/* Botones */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-green-600 text-white p-3 rounded-md flex items-center space-x-2"
            >
              <IoMdSave />
              <span>Guardar</span>
            </button>
            <button
              type="button"
              onClick={() => setFiles([])}
              className="bg-red-600 text-white p-3 rounded-md flex items-center space-x-2"
            >
              <FaTrashAlt />
              <span>Eliminar</span>
            </button>
          </div>
        </form>

        {/* Progreso de subida */}
        {isSubmitting && <ProgressBar progress={50} />}
      </div>
    </div>
  );
};

export default UploadProjectPage;
