import React from 'react';
import { FaBriefcase, FaGraduationCap, FaSearch, FaLock } from 'react-icons/fa';

export default function FeaturesSection() {
  return (
    <section className="features-section bg-gray-50 py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Beneficios de la Plataforma</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Conexión con Empresas */}
          <div className="feature-card p-6 max-w-sm bg-white rounded-lg shadow-lg hover:shadow-xl transition">
            <div className="text-4xl text-blue-600 mb-4">
              <FaBriefcase />
            </div>
            <h3 className="text-xl font-semibold mb-2">Conexión con Empresas</h3>
            <p className="text-gray-600">
              Nuestra plataforma te conecta con empresas que buscan talentos, ayudándote a encontrar oportunidades laborales y de colaboración.
            </p>
          </div>

          {/* Portafolio Académico */}
          <div className="feature-card p-6 max-w-sm bg-white rounded-lg shadow-lg hover:shadow-xl transition">
            <div className="text-4xl text-green-600 mb-4">
              <FaGraduationCap />
            </div>
            <h3 className="text-xl font-semibold mb-2">Portafolio Académico</h3>
            <p className="text-gray-600">
              Los estudiantes pueden crear y exhibir su propio portafolio de proyectos académicos, demostrando su talento y habilidades ante potenciales empleadores.
            </p>
          </div>

          {/* Búsqueda Avanzada de Proyectos */}
          <div className="feature-card p-6 max-w-sm bg-white rounded-lg shadow-lg hover:shadow-xl transition">
            <div className="text-4xl text-orange-600 mb-4">
              <FaSearch />
            </div>
            <h3 className="text-xl font-semibold mb-2">Búsqueda Avanzada de Proyectos</h3>
            <p className="text-gray-600">
              Con nuestras herramientas avanzadas de búsqueda y filtrado, puedes encontrar proyectos que se ajusten exactamente a tus intereses y habilidades.
            </p>
          </div>

          {/* Protección de Propiedad Intelectual */}
          <div className="feature-card p-6 max-w-sm bg-white rounded-lg shadow-lg hover:shadow-xl transition">
            <div className="text-4xl text-purple-600 mb-4">
              <FaLock />
            </div>
            <h3 className="text-xl font-semibold mb-2">Protección de Propiedad Intelectual</h3>
            <p className="text-gray-600">
              Ofrecemos opciones avanzadas de privacidad y licencias para proteger tus proyectos e ideas, asegurando que tu propiedad intelectual esté protegida.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
