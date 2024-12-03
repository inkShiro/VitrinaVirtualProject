"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Dashboard/Sidebar';
import LoadingSpinner from '@/components/Efectos/LoadingSpinner';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const DashboardEmpresaPage = () => {
  const [companyData, setCompanyData] = useState<any>(null);
  const [additionalData, setAdditionalData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (!storedUserId) return; // Si no hay un ID de usuario almacenado, no continuamos.

    setUserId(storedUserId);

    const loadDataFromStorage = async () => {
      const cachedCompanyData = localStorage.getItem('companyData');
      const cachedAdditionalData = localStorage.getItem('additionalData');

      if (cachedCompanyData) setCompanyData(JSON.parse(cachedCompanyData));
      if (cachedAdditionalData) setAdditionalData(JSON.parse(cachedAdditionalData));
    };

    loadDataFromStorage();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        if (!companyData) {
          const response = await fetch(`${API_BASE_URL}/companies/user/${userId}`);
          const data = await response.json();
          setCompanyData(data);
          localStorage.setItem('companyData', JSON.stringify(data));
          console.log("Datos de la empresa cargados:", data);
        }

        if (!additionalData) {
          const response = await fetch(`${API_BASE_URL}/users/${userId}`);
          const data = await response.json();
          setAdditionalData(data);
          localStorage.setItem('additionalData', JSON.stringify(data));
          console.log("Datos adicionales del usuario cargados:", data);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, companyData, additionalData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar empresa_view={true} />
      <div className="ml-12 p-8 w-full bg-gray-100 flex justify-center items-center">
        <div className="max-w-4xl w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Dashboard Empresa</h2>
          </div>

          {companyData && additionalData ? (
            <div className="space-y-6">
              {/* Resumen de la empresa */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">Bienvenido, {additionalData.fullName}</h3>
                <p><strong>Industria:</strong> {companyData.industry || "No especificado"}</p>
                <p><strong>Tamaño:</strong> {companyData.companySize || "No especificado"}</p>
                <p><strong>Ubicación:</strong> {companyData.location || "No especificado"}</p>
                <p><strong>Descripción:</strong> {companyData.description || "No especificado"}</p>
              </div>

              {/* Ejemplo: Lista de metas de colaboración */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">Metas de Colaboración</h3>
                <p>{companyData.collaborationGoals || "No especificado"}</p>
              </div>
            </div>
          ) : (
            <p>No se encontraron datos de la empresa.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardEmpresaPage;
