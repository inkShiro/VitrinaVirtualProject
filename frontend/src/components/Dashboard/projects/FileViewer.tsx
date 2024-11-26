import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiExternalLink, FiTrash } from 'react-icons/fi';

interface File {
  id: string;
  url: string;
}

interface FileViewerProps {
  fileUrls: File[]; // Acepta un arreglo de objetos con id y url
  mode: 'onlyView' | 'editor'; // Define el modo del visor
  onDeleteFile?: (fileIds: string[]) => void; // Callback para eliminar archivos
}

const FileViewer: React.FC<FileViewerProps> = ({ fileUrls = [], mode = 'onlyView', onDeleteFile }) => {
  const [currentFileIndex, setCurrentFileIndex] = useState<number>(0);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado para mostrar el modal de confirmación

  // Función para obtener la extensión del archivo y determinar el tipo de visualización
  const getFileExtension = (url: string) => {
    const parts = url.split('.');
    return parts[parts.length - 1].toLowerCase();
  };

  const renderFileViewer = (fileUrl: string) => {
    const fileExtension = getFileExtension(fileUrl);

    switch (fileExtension) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return (
          <div className="flex justify-center items-center" style={{ height: '100%' }}>
            <img
              src={fileUrl}
              alt="File Preview"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
            />
          </div>
        );
      case 'txt':
        return (
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="text-gray-700 whitespace-pre-wrap">{fileUrl}</pre>
          </div>
        );
      case 'zip':
        return (
          <div className="bg-gray-100 p-4 rounded-lg">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              Descargar archivo ZIP
            </a>
          </div>
        );
      case 'pdf':
        return (
          <div className="bg-gray-100 p-4 rounded-lg">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              Ver documento PDF
            </a>
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600">Este archivo no tiene un visor disponible. Puedes descargarlo.</p>
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              Descargar archivo
            </a>
          </div>
        );
    }
  };

  // Función para mover al archivo anterior
  const prevFile = () => {
    setCurrentFileIndex((prevIndex) => (prevIndex === 0 ? fileUrls.length - 1 : prevIndex - 1));
  };

  // Función para mover al siguiente archivo
  const nextFile = () => {
    setCurrentFileIndex((prevIndex) => (prevIndex === fileUrls.length - 1 ? 0 : prevIndex + 1));
  };

  // Función para seleccionar o deseleccionar un archivo
  const toggleSelectFile = (fileId: string) => {
    setSelectedFiles((prevSelected) =>
      prevSelected.includes(fileId)
        ? prevSelected.filter((id) => id !== fileId)
        : [...prevSelected, fileId]
    );
  };

  // Función para abrir el modal de confirmación
  const openModal = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevenir cualquier acción predeterminada del evento
    setIsModalOpen(true);
  };

  // Función para cerrar el modal de confirmación
  const closeModal = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevenir cualquier acción predeterminada del evento
    setIsModalOpen(false);
  };

  // Función para eliminar los archivos seleccionados
  const deleteFile = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevenir recarga de la página
    if (onDeleteFile) {
      console.log("Archivos a eliminar:", selectedFiles); // Depuración para verificar los archivos seleccionados
      // Filtramos los archivos que no han sido seleccionados
      const updatedFileUrls = fileUrls.filter(file => !selectedFiles.includes(file.id));
      // Si el archivo que estamos viendo actualmente está siendo eliminado, ajustamos el índice
      const newIndex = updatedFileUrls.length === 0 ? 0 : Math.min(currentFileIndex, updatedFileUrls.length - 1);
      setCurrentFileIndex(newIndex); // Actualizamos el índice del archivo
      onDeleteFile(selectedFiles); // Llamar al callback para eliminar los archivos seleccionados
      setSelectedFiles([]); // Limpiar los archivos seleccionados después de la eliminación
      setIsModalOpen(false); // Cerrar el modal después de eliminar los archivos
    }
  };

  return (
    <div className="file-viewer-container">
      {/* Contenedor principal con altura específica y position relativa */}
      <div className="relative mb-6" style={{ height: '600px' }}>
        {/* Botones de navegación */}
        <button
          onClick={prevFile}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-600 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200"
        >
          <FiChevronLeft />
        </button>

        {/* Visor de archivo central */}
        <div className="file-viewer-viewport" style={{ height: '100%', overflow: 'hidden' }}>
          {renderFileViewer(fileUrls[currentFileIndex].url)}
        </div>

        {/* Botón para siguiente archivo */}
        <button
          onClick={nextFile}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-600 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200"
        >
          <FiChevronRight />
        </button>

        {/* Botón para abrir el archivo en una nueva ventana */}
        {getFileExtension(fileUrls[currentFileIndex].url) === 'jpg' && (
          <a
            href={fileUrls[currentFileIndex].url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 right-4 text-white bg-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-800"
          >
            <FiExternalLink />
          </a>
        )}
      </div>

      {/* Miniaturas de archivos */}
      <div className="flex overflow-x-auto gap-4 py-4">
        {fileUrls.map((file, index) => (
          <div
            key={file.id}
            onClick={(event) =>
              mode === 'editor' ? toggleSelectFile(file.id) : setCurrentFileIndex(index)
            }
            className={`thumbnail-container cursor-pointer relative ${
              selectedFiles.includes(file.id) ? 'border-4 border-red-500' : 'border-2 border-gray-300'
            }`}
          >
            <img
              src={file.url}
              alt={`Thumbnail ${index + 1}`}
              className="w-20 h-20 object-cover rounded-lg transition-transform duration-300 transform hover:scale-110"
            />
            {mode === 'editor' && selectedFiles.includes(file.id) && (
              <div className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full">
                <FiTrash />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Botón para abrir el modal de eliminación */}
      {mode === 'editor' && selectedFiles.length > 0 && (
        <button
          onClick={openModal}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Eliminar archivos seleccionados
        </button>
      )}

      {/* Modal de confirmación */}
      {isModalOpen && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="modal-content bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold">Confirmar eliminación</h2>
            <p className="mt-2">¿Estás seguro de que quieres eliminar estos archivos?</p>
            <div className="mt-4 flex justify-between">

              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={deleteFile}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileViewer;
