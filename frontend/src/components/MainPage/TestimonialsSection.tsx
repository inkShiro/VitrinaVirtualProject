import React from 'react';
import Image from 'next/image';

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section bg-gray-100 py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Lo que dicen nuestros usuarios</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Testimonio de Estudiante */}
          <div className="testimonial-card p-6 max-w-sm bg-white rounded-lg shadow-lg hover:shadow-xl transition">
            <p className="text-gray-600 italic mb-4">
              &quot;Gracias a esta plataforma, pude conectar con una empresa que estaba buscando proyectos académicos en mi área de estudio. Mi portafolio fue clave para conseguir mi primer empleo.&quot;
            </p>
            <div className="flex items-center justify-center">
              <Image
                src="https://via.placeholder.com/50"
                alt="Estudiante"
                width={50}
                height={50}
                className="rounded-full mr-4"
              />
              <div>
                <p className="font-semibold">Ana Pérez</p>
                <p className="text-gray-500">Estudiante de Ingeniería de Software</p>
              </div>
            </div>
          </div>

          {/* Testimonio de Empresa */}
          <div className="testimonial-card p-6 max-w-sm bg-white rounded-lg shadow-lg hover:shadow-xl transition">
            <p className="text-gray-600 italic mb-4">
              &quot;La plataforma nos permitió encontrar proyectos innovadores para colaborar con estudiantes talentosos. Ha sido una gran herramienta para identificar futuros talentos para nuestra empresa.&quot;
            </p>
            <div className="flex items-center justify-center">
              <Image
                src="https://via.placeholder.com/50"
                alt="Empresa"
                width={50}
                height={50}
                className="rounded-full mr-4"
              />
              <div>
                <p className="font-semibold">Carlos López</p>
                <p className="text-gray-500">Director de Innovación, TechSolutions</p>
              </div>
            </div>
          </div>

          {/* Testimonio adicional */}
          <div className="testimonial-card p-6 max-w-sm bg-white rounded-lg shadow-lg hover:shadow-xl transition">
            <p className="text-gray-600 italic mb-4">
              &quot;Me encantó poder filtrar los proyectos y encontrar exactamente lo que buscaba. Además, el portafolio me permitió mostrar mis habilidades de manera efectiva.&quot;
            </p>
            <div className="flex items-center justify-center">
              <Image
                src="https://via.placeholder.com/50"
                alt="Estudiante"
                width={50}
                height={50}
                className="rounded-full mr-4"
              />
              <div>
                <p className="font-semibold">Javier Rodríguez</p>
                <p className="text-gray-500">Estudiante de Diseño Gráfico</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
