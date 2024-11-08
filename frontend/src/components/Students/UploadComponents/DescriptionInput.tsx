// src/components/DescriptionInput.tsx
import React from 'react';

interface DescriptionInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const DescriptionInput = ({ value, onChange }: DescriptionInputProps) => {
  return (
    <div>
      <label className="block text-sm font-medium">Descripción</label>
      <textarea
        value={value}
        onChange={onChange}
        className="mt-1 block w-full p-2 border rounded-md"
        rows={4}
        required
      />
    </div>
  );
};

export default DescriptionInput;
