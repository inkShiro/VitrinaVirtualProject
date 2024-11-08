// src/components/Dashboard/ProfileActions.tsx
import React from 'react';

const ProfileActions = () => (
  <div className="mt-6 flex justify-end space-x-4">
    <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">Editar Perfil</button>
    <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition">Eliminar Cuenta</button>
  </div>
);

export default ProfileActions;
