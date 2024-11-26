import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registro de los componentes necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

interface StudentSummaryProps {
  name: string;
  career: string;
  profileImage: string;
  institution: string;
}

const StudentSummary: React.FC<StudentSummaryProps> = ({
  name,
  career,
  profileImage,
  institution,
}) => {
  return (
    <div className="max-w-5xl mx-auto p-10 bg-white rounded-lg shadow-xl border border-gray-200">
      {/* Perfil */}
      <div className="flex items-center mb-8">
        <img
          src={profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-gray-300 shadow-lg mr-6"
        />
        <div>
          <h3 className="font-bold text-2xl text-gray-800">{name}</h3>
          <p className="text-lg text-gray-600">
            {career} - <span className="text-gray-500">{institution}</span>
          </p>
        </div>
      </div>
      {/* Separador decorativo */}
      <div className="border-t-2 border-gray-200 mb-6"></div>
    </div>
  );
};

export default StudentSummary;
