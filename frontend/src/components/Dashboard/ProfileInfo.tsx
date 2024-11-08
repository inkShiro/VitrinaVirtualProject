// src/components/Dashboard/ProfileInfo.tsx

interface ProfileInfoProps {
    userType: string; // Asegúrate de que 'userType' sea string
    userData: any;    // Puedes definir un tipo más específico si es necesario
  }
  
  const ProfileInfo: React.FC<ProfileInfoProps> = ({ userType, userData }) => {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Información del Perfil</h2>
        {userType === "estudiante" ? (
          <div>
            <p><strong>Programa de estudios:</strong> {userData.studyProgram}</p>
            <p><strong>Institución:</strong> {userData.institution}</p>
            <p><strong>Nivel educativo:</strong> {userData.educationLevel}</p>
            <p><strong>Intereses académicos:</strong> {userData.academicInterests}</p>
            <p><strong>Ubicación:</strong> {userData.location}</p>
            <p><strong>Fecha de nacimiento:</strong> {userData.birthDate}</p>
            <p><strong>Portafolio:</strong> <a href={userData.portfolioUrl} target="_blank" rel="noopener noreferrer">{userData.portfolioUrl}</a></p>
          </div>
        ) : (
          <div>
            <p><strong>Industria:</strong> {userData.industry}</p>
            <p><strong>Tamaño de la empresa:</strong> {userData.companySize}</p>
            <p><strong>Ubicación:</strong> {userData.location}</p>
            <p><strong>Sitio web:</strong> <a href={userData.websiteUrl} target="_blank" rel="noopener noreferrer">{userData.websiteUrl}</a></p>
            <p><strong>Descripción:</strong> {userData.description}</p>
            <p><strong>Rol de contacto:</strong> {userData.contactRole}</p>
            <p><strong>Objetivos de colaboración:</strong> {userData.collaborationGoals}</p>
          </div>
        )}
      </div>
    );
  };
  
  export default ProfileInfo;
  