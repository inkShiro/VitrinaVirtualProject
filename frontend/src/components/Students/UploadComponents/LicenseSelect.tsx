// src/components/LicenseSelect.tsx
import React from 'react';

interface LicenseSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const LicenseSelect = ({ value, onChange }: LicenseSelectProps) => {
  return (
    <div>
      <label className="block text-sm font-medium">Licencia</label>
      <select
        value={value}
        onChange={onChange}
        className="mt-1 block w-full p-2 border rounded-md"
      >
        <option value="Licencia Creative Commons">Licencia Creative Commons</option>
        <option value="Licencia de uso personal">Licencia de uso personal</option>
      </select>
    </div>
  );
};

export default LicenseSelect;
