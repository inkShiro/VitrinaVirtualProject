"use client";

import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [activeLink, setActiveLink] = useState<string>('inicio');
  const router = useRouter();

  const handleSetActive = (link: string) => {
    setActiveLink(link);
  };

  const goToLoginPage = () => {
    router.push('/login'); // Redirige a la página de login
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-8">
        <div className="logo text-xl font-bold text-blue-600">TuPlataforma</div>
        <nav className="flex space-x-4">
          <ScrollLink
            to="inicio"
            smooth={true}
            duration={500}
            className={`cursor-pointer ${activeLink === 'inicio' ? 'border-b-2 border-blue-600' : ''}`}
            onSetActive={() => handleSetActive('inicio')}
          >
            Inicio
          </ScrollLink>
          <ScrollLink
            to="features"
            smooth={true}
            duration={500}
            className={`cursor-pointer ${activeLink === 'features' ? 'border-b-2 border-blue-600' : ''}`}
            onSetActive={() => handleSetActive('features')}
          >
            Características
          </ScrollLink>
          <ScrollLink
            to="projects"
            smooth={true}
            duration={500}
            className={`cursor-pointer ${activeLink === 'projects' ? 'border-b-2 border-blue-600' : ''}`}
            onSetActive={() => handleSetActive('projects')}
          >
            Proyectos
          </ScrollLink>
          <ScrollLink
            to="testimonials"
            smooth={true}
            duration={500}
            className={`cursor-pointer ${activeLink === 'testimonials' ? 'border-b-2 border-blue-600' : ''}`}
            onSetActive={() => handleSetActive('testimonials')}
          >
            Testimonios
          </ScrollLink>
          <ScrollLink
            to="faq"
            smooth={true}
            duration={500}
            className={`cursor-pointer ${activeLink === 'faq' ? 'border-b-2 border-blue-600' : ''}`}
            onSetActive={() => handleSetActive('faq')}
          >
            FAQ
          </ScrollLink>
          <ScrollLink
            to="contact"
            smooth={true}
            duration={500}
            className={`cursor-pointer ${activeLink === 'contact' ? 'border-b-2 border-blue-600' : ''}`}
            onSetActive={() => handleSetActive('contact')}
          >
            Contacto
          </ScrollLink>
        </nav>
        <div className="flex space-x-4">
          <button
            onClick={goToLoginPage}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Comenzar
          </button>
        </div>
      </div>
    </header>
  );
}
