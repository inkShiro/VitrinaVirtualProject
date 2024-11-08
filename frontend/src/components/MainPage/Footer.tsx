import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto text-center space-y-8">
        {/* Copyright */}
        <p>&copy; {new Date().getFullYear()} TuPlataforma. Todos los derechos reservados.</p>

        {/* Enlaces rápidos */}
        <div className="flex justify-center space-x-6 text-lg">
          <a href="/terms" className="hover:underline">Términos y condiciones</a>
          <a href="/privacy" className="hover:underline">Política de privacidad</a>
          <a href="/contact" className="hover:underline">Contacto</a>
        </div>

        {/* Redes Sociales */}
        <div className="flex justify-center space-x-6 text-2xl">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            <FaFacebook />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaTwitter />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">
            <FaInstagram />
          </a>
        </div>

        {/* Información de contacto */}
        <div className="text-gray-400">
          <p>Correo: contacto@tuplataforma.com</p>
          <p>Teléfono: +1 (123) 456-7890</p>
        </div>
      </div>
    </footer>
  );
}
