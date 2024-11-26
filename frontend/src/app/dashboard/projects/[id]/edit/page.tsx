"use client"
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import ProjectTitleInput from "@/components/Dashboard/projects/ProjectTitleInput";
import ProjectDescriptionInput from "@/components/Dashboard/projects/ProjectDescriptionInput";
import CategoriesSelector from "@/components/Dashboard/projects/CategoriesSelector";
import PrivacySelector from "@/components/Dashboard/projects/PrivacySelector";
import LicenseSelector from "@/components/Dashboard/projects/LicenseSelector";
import CollaboratorsSelector from "@/components/Dashboard/projects/Collaborators";
import FilesUploader from "@/components/Dashboard/projects/FileUpload";
import SubmitButton from "@/components/Dashboard/projects/SubmitButton";
import Notification from "@/components/Efectos/Notification";
import Link from "next/link";
import { useParams } from "next/navigation";
import FileViewer from "@/components/Dashboard/projects/FileViewer";

interface Author {
  id: number;
  userId: number;
  studyProgram: string;
  institution: string;
  educationLevel: string;
  academicInterests: string;
  location: string;
  birthDate: string;
  portfolioUrl: string;
  profilePicture: string | null;
}

interface Collaborator extends Author {}

interface Category {
  id: string;
  name: string;
}

interface Filedata {
  id: number;
  fileUrl: string;
  projectId: number;
}

interface ProjectData {
  id: number;
  title: string;
  description: string;
  privacy: boolean;
  license: string;
  authorId: number;
  author: Author;
  collaborators: Collaborator[];
  categories: Category[];
  files: Filedata[];
}


const UploadProjectPage = () => {
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formattedCategories, setFormattedCategories] = useState<Category[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [categoriesSelected, setCategoriesSelected] = useState<{ id: string; name: string }[]>([]);
  const [privacy, setPrivacy] = useState<{ id: string; name: string } | null>(null);
  const [InitialPrivacyId, setInitialPrivacyId] = useState("");
  const [license, setLicense] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [OldFiles, setOldFiles] = useState<{ id: number; fileUrl: string; projectId: number }[]>([]);
  const [collaborators, setCollaborators] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [collaboratorSearch, setCollaboratorSearch] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authorId, setAuthorId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

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
        const response = await fetch("${API_BASE_URL}/categories/");
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
    fetchProjectByID(id)
    .then((data) => {
      handleSetProjectData(data);
    })
    .catch((error) => {
      console.error("Error al cargar el proyecto:", error);
    });
}, []);

  const fetchProjectByID = async (projectId: string | string[]) => {
    try {
      if (!projectId) {
        throw new Error("El ID del proyecto no está definido.");
      }
      const url = '${API_BASE_URL}/projects/${projectId}';
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error al obtener el proyecto: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en fetchProjectByID:", error);
      throw error;
    }
  };

  const handleSetProjectData = (data: ProjectData) => {
    setTitle(data.title);
    setDescription(data.description);
    const privacyValue = data.privacy ? "2" : "1";
    setInitialPrivacyId(privacyValue);
    setLicense(data.license);
    const formattedCollaborators = data.collaborators.map((collaborator) => ({
      userId: collaborator.userId
    }));
    formattedCollaborators.forEach((formattedCollaborator) => {
      fetchUserData(formattedCollaborator.userId)
        .then((userData) => {
          return handleCollaboratorSearch(userData.fullName)
            .then((fullFilteredUsers) => {
              const transformedUser = fullFilteredUsers.length > 0 ? fullFilteredUsers[0] : null;
              return transformedUser;
            });
        })
        .then((transformedUser) => {
          if (transformedUser) {
            handleCollaboratorSelect(transformedUser);
          } else {
            console.warn("No se encontró un usuario válido para handleCollaboratorSelect");
          }
        })
        .catch((error) => {
          console.error(
            "Error procesando colaborador con userId:",
            formattedCollaborator.userId,
            error
          );
        });
    });
    const formattedCategories = data.categories.map((category) => ({
      id: String(category.id),
      name: category.name,
    }));
    setFormattedCategories(formattedCategories);
    setOldFiles(data.files);
  };

  const deleteFileFromApi = async (fileId: string) => {
    try {
      const response = await fetch('${API_BASE_URL}/files/${fileId}', {
        method: 'DELETE',
      });
      if (response.ok) {
        return fileId;
      } else {
        throw new Error('Error al eliminar el archivo');
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };
  
  const fetchUserData = async (userId: any) => {
    try {
      const url = '${API_BASE_URL}/users/${userId}';
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error al obtener los datos del usuario: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en fetchUserData:", error);
    }
  };

  const handleCollaboratorSearch = async (name: string) => {
    setCollaboratorSearch(name);
    if (name.trim().length > 2) {
      try {
        const usersResponse = await fetch("${API_BASE_URL}/users");
        const usersData = await usersResponse.json();
        const filteredUsers = usersData.filter(
          (user: { fullName: string; userType: string }) =>
            user.userType === "student" && user.fullName.toLowerCase().includes(name.toLowerCase())
        );
        const studentsResponse = await fetch("${API_BASE_URL}/students");
        const studentsData = await studentsResponse.json();
        const fullFilteredUsers = filteredUsers.map((user: any) => {
          const studentData = studentsData.find((student: { userId: string }) => student.userId === user.id);
          const userWithStudentData = {
            ...user,
            university: studentData?.institution || "",
            profilePicture: studentData?.profilePicture || null,
            additionalInfo: studentData?.academicInterests || "",
          };
          return userWithStudentData;
        });
        setFilteredUsers(fullFilteredUsers);
        return fullFilteredUsers;
      } catch (error) {
        console.error("Error buscando colaboradores:", error);
        throw error;
      }
    } else {
      setFilteredUsers([]);
      return [];
    }
  };
  
  const handleCollaboratorSelect = async (collaborator: any) => {
    setCollaborators((prevCollaborators) => {
      if (prevCollaborators.some((c) => c.id === collaborator.id)) {
        return prevCollaborators;
      }
      return [...prevCollaborators, collaborator];
    });
    try {
      const studentResponse = await fetch('${API_BASE_URL}/students/user/${collaborator.id}');
      if (!studentResponse.ok) {
        throw new Error("Error al obtener los detalles del colaborador.");
      }
      const studentData = await studentResponse.json();
      const collaboratorWithStudentData = {
        ...collaborator,
        studentId: studentData.id,
      };
      setCollaborators((prevCollaborators) =>
        prevCollaborators.map((c) =>
          c.id === collaborator.id ? collaboratorWithStudentData : c
        )
      );
    } catch (error) {
      console.error("Error al obtener detalles del colaborador:", error);
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
      if (files.length > 0) {
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("files", file);
        });
        const uploadResponse = await fetch("${API_BASE_URL}/files/upload/multiple", {
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
        id: parseInt(Array.isArray(id) ? id[0] : id, 10),  // Convertimos el id a entero
        ...(fileDetails.length > 0 && { files: fileDetails }), // Solo añade files si fileDetails no está vacío
      };
      const createProjectResponse = await fetch('${API_BASE_URL}/projects/${projectDataWithFiles.id}', {
        method: "PATCH",
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
          <h2 className="text-4xl font-semibold text-gray-900 mb-6">Formulario de edicion de Proyecto</h2>
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
                preSelectedCategories={formattedCategories}
              />
              <PrivacySelector
                privacyOptions={[{ id: "1", name: "Público" }, { id: "2", name: "Privado" }]}
                selectedPrivacy={privacy}
                setSelectedPrivacy={setPrivacy}
                initialSelectedId={InitialPrivacyId}
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
              <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-lg text-gray-800 py-2">Selecciona los documentos que desees eliminar:</h3>
                {OldFiles.length > 0 ? (
                  <FileViewer
                  fileUrls={OldFiles.map(file => ({ id: String(file.id), url: file.fileUrl }))}
                  mode="editor"
                  onDeleteFile={async (updatedFiles) => {
                    // Iterar sobre los IDs de los archivos y eliminarlos
                    for (const fileId of updatedFiles) {
                      const deletedFileId = await deleteFileFromApi(fileId);  // Llamar a la función de eliminación
                      if (deletedFileId) {
                        // Actualizar el estado de los archivos eliminados
                        setOldFiles(prevFiles => prevFiles.filter(file => file.id !== parseInt(deletedFileId)));
                        console.log(`Archivo con ID ${deletedFileId} eliminado exitosamente.`);
                      } else {
                        console.error(`Error al eliminar el archivo con ID ${fileId}.`);
                      }
                    }
                  }}
                />
                ) : (
                  <p className="text-gray-600">No hay archivos</p>
                )}
              </div>
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
