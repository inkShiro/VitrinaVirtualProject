// src/components/Dashboard/ProfileDetails.tsx
import React from 'react';

interface StudentProfile {
  studyProgram: string;
  institution: string;
  educationLevel: string;
  academicInterests: string;
  location: string;
  birthDate?: string;
  portfolioUrl?: string;
}

interface CompanyProfile {
  industry: string;
  companySize: string;
  location: string;
  websiteUrl: string;
  description: string;
  contactRole: string;
  collaborationGoals?: string;
}

interface ProfileDetailsProps {
  userType: string;
  studentProfile?: StudentProfile | null;
  companyProfile?: CompanyProfile | null;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ userType, studentProfile, companyProfile }) => (
  <div className="mt-4 space-y-4">
    {userType === "estudiante" && studentProfile && (
      <>
        <p><strong>Programa de Estudio:</strong> {studentProfile.studyProgram}</p>
        <p><strong>Institución:</strong> {studentProfile.institution}</p>
        <p><strong>Nivel Educativo:</strong> {studentProfile.educationLevel}</p>
        <p><strong>Intereses Académicos:</strong> {studentProfile.academicInterests}</p>
        <p><strong>Ubicación:</strong> {studentProfile.location}</p>
        {studentProfile.birthDate && <p><strong>Fecha de Nacimiento:</strong> {studentProfile.birthDate}</p>}
        {studentProfile.portfolioUrl && <p><strong>Portafolio:</strong> <a href={studentProfile.portfolioUrl} className="text-blue-600 hover:underline">{studentProfile.portfolioUrl}</a></p>}
      </>
    )}
    {userType === "empresa" && companyProfile && (
      <>
        <p><strong>Industria:</strong> {companyProfile.industry}</p>
        <p><strong>Tamaño de la Empresa:</strong> {companyProfile.companySize}</p>
        <p><strong>Ubicación:</strong> {companyProfile.location}</p>
        <p><strong>Sitio Web:</strong> <a href={companyProfile.websiteUrl} className="text-blue-600 hover:underline">{companyProfile.websiteUrl}</a></p>
        <p><strong>Descripción:</strong> {companyProfile.description}</p>
        <p><strong>Rol de Contacto:</strong> {companyProfile.contactRole}</p>
        {companyProfile.collaborationGoals && <p><strong>Objetivos de Colaboración:</strong> {companyProfile.collaborationGoals}</p>}
      </>
    )}
  </div>
);

export default ProfileDetails;
