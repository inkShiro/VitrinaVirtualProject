import React from 'react';
import Image from 'next/image';

export default function FeaturedProjects() {
  return (
    <section className="featured-projects bg-white py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Proyectos Destacados</h2>
        <div className="flex flex-wrap justify-center space-x-4">
          {[1, 2, 3].map((project) => (
            <div key={project} className="max-w-xs bg-gray-100 p-4 rounded-lg shadow">
              <Image src={`/project-${project}.jpg`} alt={`Proyecto ${project}`} width={300} height={200} />
              <h3 className="text-xl font-semibold mt-4">Título del Proyecto {project}</h3>
              <p className="text-gray-600 mt-2">Breve descripción del proyecto.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
