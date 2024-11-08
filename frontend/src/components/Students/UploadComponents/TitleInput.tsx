// src/components/TitleInput.tsx
import React from 'react';

interface TitleInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TitleInput = ({ value, onChange }: TitleInputProps) => {
  return (
    <div>
      <label className="block text-sm font-medium">Título del Proyecto</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="mt-1 block w-full p-2 border rounded-md"
        required
      />
    </div>
  );
};

export default TitleInput;
