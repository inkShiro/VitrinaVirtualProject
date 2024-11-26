import React from "react";
import { FiUpload } from "react-icons/fi";
import Link from "next/link";
interface SubmitButtonProps {
  isSubmitting: boolean;
  onSubmit: () => Promise<void>;
  redirect: boolean; // Nueva propiedad para manejar la redirección
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting, onSubmit, redirect }) => {
  return (
    <div className="flex justify-center">
      {redirect ? ( // Redirige usando Link si el proyecto se subió
        <Link href="/dashboard/projects" className="mt-4 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center">
          Proyecto Subido, Ver Proyectos
        </Link>
      ) : (
        <button
          type="button"
          onClick={onSubmit}
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 flex items-center justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="mr-2">Enviando...</span>
              <FiUpload className="animate-spin" />
            </>
          ) : (
            <>
              <span className="mr-2">Subir Proyecto</span>
              <FiUpload />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default SubmitButton;
