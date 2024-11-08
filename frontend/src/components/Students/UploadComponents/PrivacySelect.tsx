// src/components/PrivacySelect.tsx
import React from 'react';

interface PrivacySelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PrivacySelect = ({ value, onChange }: PrivacySelectProps) => {
  return (
    <div>
      <label className="block text-sm font-medium">Privacidad</label>
      <select
        value={value}
        onChange={onChange}
        className="mt-1 block w-full p-2 border rounded-md"
      >
        <option value="Público">Público</option>
        <option value="Privado">Privado</option>
      </select>
    </div>
  );
};

export default PrivacySelect;
