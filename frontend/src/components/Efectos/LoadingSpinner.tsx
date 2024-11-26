import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-4 border-gray-300 border-solid rounded-full opacity-50"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
