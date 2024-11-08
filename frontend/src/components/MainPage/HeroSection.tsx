import React from 'react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="hero-section bg-blue-50 pt-20 pb-12">
      <div className="container mx-auto flex flex-col items-center text-center space-y-4">
        <Image src="/hero-image.jpg" alt="Conexión entre estudiantes y empresas" width={600} height={400} />
        <h1 className="text-4xl font-bold text-gray-800">Conecta tus proyectos académicos con oportunidades empresariales</h1>
        <button className="bg-blue-600 text-white px-6 py-3 rounded text-lg">Registrarse Ahora</button>
      </div>
    </section>
  );
}
