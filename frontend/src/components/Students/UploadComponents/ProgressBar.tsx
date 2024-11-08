// src/components/ProgressBar.tsx
import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="mt-4">
      <div className="w-full bg-gray-300 h-2 rounded-full">
        <div className="bg-green-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
      <span className="text-sm text-gray-500 mt-2">Subiendo proyecto...</span>
    </div>
  );
};

export default ProgressBar;
