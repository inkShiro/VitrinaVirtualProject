// src/components/FileInput.tsx
import React from 'react';

interface FileInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput = ({ onChange }: FileInputProps) => {
  return (
    <div>
      <label className="block text-sm font-medium">Archivos Adjuntos</label>
      <input
        type="file"
        multiple
        onChange={onChange}
        className="mt-1 block w-full p-2 border rounded-md"
      />
    </div>
  );
};

export default FileInput;
