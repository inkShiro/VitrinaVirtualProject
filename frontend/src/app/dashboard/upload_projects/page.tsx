"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Dashboard/Sidebar";
import ProjectTitleInput from "../../../components/Dashboard/projects/ProjectTitleInput";
import ProjectDescriptionInput from "../../../components/Dashboard/projects/ProjectDescriptionInput";
import CategoriesSelector from "../../../components/Dashboard/projects/CategoriesSelector";
import PrivacySelector from "../../../components/Dashboard/projects/PrivacySelector";
import LicenseSelector from "../../../components/Dashboard/projects/LicenseSelector";
import CollaboratorsSelector from "../../../components/Dashboard/projects/Collaborators";
import FilesUploader from "../../../components/Dashboard/projects/FileUpload";
import SubmitButton from "../../../components/Dashboard/projects/SubmitButton";
import Notification from "../../../components/Efectos/Notification";  // Importar el componente Notification
import Link from "next/link";

const UploadProjectPage = () => {
  const [redirect, setRedirect] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [categoriesSelected, setCategoriesSelected] = useState<{ id: string; name: string }[]>([]);
  const [privacy, setPrivacy] = useState<{ id: string; name: string } | null>(null);
  const [license, setLicense] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [collaborators, setCollaborators] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [collaboratorSearch, setCollaboratorSearch] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authorId, setAuthorId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Estado para manejar las notificaciones
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error"; visible: boolean }>({
    message: "",
    type: "success", // Solo "success" o "error"
    visible: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("user_id");
      const cachedSessionId = localStorage.getItem(`sessionId`);
      setAuthorId(storedUserId);
      setSessionId(cachedSessionId);
    }

    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/categories/");
        if (!response.ok) {
          throw new Error("Error al obtener las categorías");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCollaboratorSearch = async (name: string) => {
    setCollaboratorSearch(name);
    if (name.trim().length > 2) {
      try {
        const usersResponse = await fetch("http://localhost:4000/api/users");
        const usersData = await usersResponse.json();
        const filteredUsers = usersData.filter(
          (user: { fullName: string; userType: string }) =>
            user.userType === "student" && user.fullName.toLowerCase().includes(name.toLowerCase())
        );

        setFilteredUsers(filteredUsers);

        const studentsResponse = await fetch("http://localhost:4000/api/students");
        const studentsData = await studentsResponse.json();

        const fullFilteredUsers = filteredUsers.map((user: any) => {
          const studentData = studentsData.find((student: { userId: string }) => student.userId === user.id);
          return {
            ...user,
            university: studentData?.institution || "",
            profilePicture: studentData?.profilePicture || null,
            additionalInfo: studentData?.academicInterests || "",
          };
        });

        setFilteredUsers(fullFilteredUsers);
      } catch (error) {
        console.error("Error buscando colaboradores:", error);
      }
    } else {
      setFilteredUsers([]);
    }
  };

  const handleCollaboratorSelect = async (collaborator: any) => {
    if (!collaborators.some((c) => c.id === collaborator.id)) {
      try {
        const studentResponse = await fetch(`http://localhost:4000/api/students/user/${collaborator.id}`);
        if (!studentResponse.ok) {
          throw new Error("Error al obtener los detalles del colaborador.");
        }
        const studentData = await studentResponse.json();
    
        const collaboratorWithStudentData = {
          ...collaborator,
          studentId: studentData.id,
        };
    
        setCollaborators([...collaborators, collaboratorWithStudentData]);
      } catch (error) {
        console.error("Error al obtener detalles del colaborador:", error);
      }
    } else {
      // Mostrar notificación de que el colaborador ya está en la lista
      setNotification({
        message: "Este colaborador ya está en la lista.",
        type: "error",
        visible: true,
      });
    }

    setFilteredUsers([]);
    setCollaboratorSearch("");
  };

  const handleCollaboratorRemove = (collaboratorId: string) => {
    setCollaborators(collaborators.filter((collaborator) => collaborator.id !== collaboratorId));
  };

  const uploadFilesAndCreateProject = async (projectData: any, files: File[]) => {
    try {
      let fileDetails = [];
  
      // Verificar si hay archivos para subir
      if (files.length > 0) {
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("files", file);
        });
  
        const uploadResponse = await fetch("http://localhost:4000/api/files/upload/multiple", {
          method: "POST",
          body: formData,
        });
  
        if (!uploadResponse.ok) {
          throw new Error("Error al subir los archivos");
        }else{
          console.log(uploadResponse);
        }
  
        const uploadedFiles = await uploadResponse.json();
  
        fileDetails = uploadedFiles.map((file: any) => ({
          fileUrl: file.url,
        }));
      }
  
      const projectDataWithFiles = {
        ...projectData,
        files: fileDetails, // Si no hay archivos, fileDetails estará vacío
      };
  
      const createProjectResponse = await fetch("http://localhost:4000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectDataWithFiles),
      });
  
      if (!createProjectResponse.ok) {
        throw new Error("Error al crear el proyecto");
      }
  
      const createdProject = await createProjectResponse.json();
  
      setNotification({ message: "Proyecto subido exitosamente", type: "success", visible: true });
    } catch (error) {
      
      console.error("Error en el proceso:", error);
      setNotification({ message: "Hubo un error al subir el proyecto", type: "error", visible: true });
    }
  };
  

  const handleSubmit = async () => {
    if (!authorId || !sessionId) {
      return;
    }

    setIsSubmitting(true);

    const authorIdInt = parseInt(authorId);
    const sessionIdInt = parseInt(sessionId);

    if (isNaN(authorIdInt) || isNaN(sessionIdInt)) {
      alert("El ID del autor o el sessionId no son válidos.");
      setIsSubmitting(false);
      return;
    }

    const validCategories = categoriesSelected.filter((cat) => cat.id != null && !isNaN(parseInt(cat.id)));

    if (validCategories.length === 0 || !title || !description || !license || !privacy) {
      setNotification({ message: "Todos los campos deben estar rellenos, excepto los de colaboradores y archivos.", type: "error", visible: true });
      setIsSubmitting(false);
      return;
    }

    const privacyBoolean = privacy && privacy.name === "Público" ? false : true;

    const projectData = {
      title,
      description,
      privacy: privacyBoolean,
      license,
      authorId: sessionIdInt,
      collaborators: collaborators.map((c) => parseInt(c.studentId)),
      categories: validCategories.map((cat) => parseInt(cat.id)),
    };

    await uploadFilesAndCreateProject(projectData, files);

    setTitle("");
    setDescription("");
    setCategoriesSelected([]);
    setPrivacy(null);
    setLicense(null);
    setFiles([]);
    setCollaborators([]);
    setIsSubmitting(false);

    setRedirect(true);
  };

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };


  return (
    <div className="flex min-h-screen bg-gray-100 mx-4">
      <Sidebar />
      <div className="flex-1 p-8 space-y-6">
        <div className="bg-white p-8 rounded-lg shadow-md mx-auto w-full max-w-3xl">
          <h2 className="text-4xl font-semibold text-gray-900 mb-6">Formulario de Subida de Proyecto</h2>
          <form className="space-y-6">
            <div className="space-y-4">
              <ProjectTitleInput title={title} setTitle={setTitle} />
              <ProjectDescriptionInput description={description} setDescription={setDescription} />
            </div>

            <div className="space-y-4">
              <CategoriesSelector
                categories={categories}
                setCategories={setCategories}
                categoriesSelected={categoriesSelected}
                setCategoriesSelected={setCategoriesSelected}
              />
              <PrivacySelector
                privacyOptions={[{ id: "1", name: "Público" }, { id: "2", name: "Privado" }]}
                selectedPrivacy={privacy}
                setSelectedPrivacy={setPrivacy}
              />
              <LicenseSelector
              licenseOptions={[
                { id: "1", name: "Creative Commons", description: "Licencia para contenido creativo." },
                { id: "2", name: "MIT", description: "Licencia permisiva ampliamente utilizada." },
                { id: "3", name: "GPLv3", description: "Licencia de copyleft fuerte para proteger la libertad del usuario." },
                { id: "4", name: "Apache 2.0", description: "Incluye manejo explícito de patentes." },
                { id: "5", name: "BSD 2-Clause", description: "Licencia simple y permisiva." },
                { id: "6", name: "BSD 3-Clause", description: "Versión con restricciones adicionales." },
                { id: "7", name: "Eclipse Public License", description: "Para proyectos asociados con Eclipse." },
                { id: "8", name: "Mozilla Public License 2.0", description: "Copyleft débil para combinar con software propietario." },
                { id: "9", name: "Unlicense", description: "Domina pública, sin derechos reservados." },
                { id: "10", name: "GNU LGPLv3", description: "Permite vincular con software propietario." },
                { id: "11", name: "Artistic License 2.0", description: "Utilizada comúnmente en proyectos como Perl." },
                { id: "12", name: "Zlib License", description: "Ideal para bibliotecas ligeras." },
                { id: "13", name: "Academic Free License", description: "Diseñada para uso académico." },
                { id: "14", name: "CC0 (Public Domain Dedication)", description: "Renuncia completa de derechos de autor." },
                { id: "15", name: "Proprietary License", description: "Código cerrado y restringido." }
              ]}
              selectedLicense={license} // El nombre de la licencia seleccionada
              setSelectedLicense={setLicense} // Actualiza el nombre de la licencia seleccionada
            />

            </div>
            <div className="space-y-4">
              <CollaboratorsSelector
                collaborators={collaborators}
                setCollaborators={setCollaborators}
                handleCollaboratorSearch={handleCollaboratorSearch}
                handleCollaboratorSelect={handleCollaboratorSelect}
                filteredUsers={filteredUsers}
                collaboratorSearch={collaboratorSearch}
              />
              <FilesUploader
                handleFileChange={setFiles}
              />
            </div>
            <SubmitButton onSubmit={handleSubmit} isSubmitting={isSubmitting}  redirect={redirect} />
           </form>
          {notification.visible && (
            <Notification
              message={notification.message}
              type={notification.type}
              onClose={closeNotification}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadProjectPage;
