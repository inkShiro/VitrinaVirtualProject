import React, { useEffect, useState } from 'react';

interface AdminPanelProps {
  onClose: () => void;
}

// Módulos y sus estados
const MODULES = ['Login'];
const DEFAULT_STATUS = 'offline';

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [moduleStatus, setModuleStatus] = useState<{ [key: string]: string }>({});

  // Obtener el estado de los módulos desde la API
  const fetchModuleStatus = async (module: string) => {
    try {
      const response = await fetch('http://localhost:4000/api/modules/status/Login', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });const data = await response.json();
      return data.isActive ? 'online' : 'offline';
    } catch (error) {
      console.error('Error al obtener el estado del módulo:', error);
      return DEFAULT_STATUS; // Si hay un error, se retorna el estado por defecto
    }
  };

  // Inicializar el estado de los módulos al cargar el componente
  useEffect(() => {
    const initializeModules = async () => {
      const initialStatus: { [key: string]: string } = {};
      for (const module of MODULES) {
        const status = await fetchModuleStatus(module);
        initialStatus[module] = status;
      }
      setModuleStatus(initialStatus);
    };
    initializeModules();
  }, []);

  // Alternar el estado del módulo y actualizarlo en la API
  const toggleModuleStatus = async (module: string) => {
    const newStatus = moduleStatus[module] === 'online' ? 'offline' : 'online';

    try {
      // Hacer la petición PATCH para actualizar el estado del módulo
      await fetch(`http://localhost:4000/api/modules/status/${module}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: newStatus === 'online' }),
      });

      // Actualizar el estado en el componente
      setModuleStatus((prevState) => ({
        ...prevState,
        [module]: newStatus,
      }));

      // Log para el estado del módulo de "Inicio de Sesión y Registro"
      if (module === 'Inicio de Sesión y Registro') {
        if (newStatus === 'offline') {
          console.log('El módulo de Inicio de Sesión y Registro está desactivado');
        } else {
          console.log('El módulo de Inicio de Sesión y Registro está activado');
        }
      }
    } catch (error) {
      console.error('Error al actualizar el estado del módulo:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Panel de Configuración</h2>
        <p>Configuraciones para el administrador.</p>

        <div className="space-y-4">
          {MODULES.map((module) => (
            <div key={module} className="flex items-center justify-between">
              <span>{module}</span>
              <button
                className={`px-4 py-2 rounded ${
                  moduleStatus[module] === 'online' ? 'bg-green-500' : 'bg-gray-300'
                }`}
                onClick={() => toggleModuleStatus(module)}
              >
                {moduleStatus[module] === 'online' ? 'On' : 'Off'}
              </button>
            </div>
          ))}
        </div>

        <button className="mt-6 px-4 py-2 bg-red-500 text-white rounded" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
