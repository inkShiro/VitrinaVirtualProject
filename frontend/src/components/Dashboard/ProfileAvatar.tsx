// src/components/Dashboard/ProfileAvatar.tsx
import React from 'react';

interface ProfileAvatarProps {
  fullName?: string;  // Asegúrate de que la propiedad sea opcional
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ fullName }) => {
  // Manejar un valor vacío o undefined para 'fullName'
  const initials = fullName ? fullName.charAt(0).toUpperCase() : "U"; // Valor por defecto si no hay nombre

  return (
    <div className="flex items-center space-x-4">
      {/* Si 'fullName' está disponible, muestra las iniciales; si no, muestra una letra por defecto */}
      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold">
        {initials}
      </div>
      <div>
        <h3 className="font-bold">{fullName || "Usuario Anónimo"}</h3> {/* Mostrar un texto por defecto si 'fullName' es undefined */}
      </div>
    </div>
  );
};

export default ProfileAvatar;
