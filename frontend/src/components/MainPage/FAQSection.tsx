"use client"
import React, { useState } from 'react';

export default function FAQSection() {
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);

  const toggleAnswer = (question: string) => {
    setActiveQuestion((prev) => (prev === question ? null : question));
  };

  return (
    <section className="faq-section bg-gray-100 py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Preguntas Frecuentes</h2>
        <div className="space-y-4">
          {/* Pregunta 1 */}
          <div className="faq-item bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <div
              className="faq-question cursor-pointer flex justify-between items-center"
              onClick={() => toggleAnswer('question1')}
            >
              <h3 className="text-xl font-semibold text-gray-800">¿Cómo puedo registrarme en la plataforma?</h3>
              <span>{activeQuestion === 'question1' ? '-' : '+'}</span>
            </div>
            {activeQuestion === 'question1' && (
              <p className="text-gray-600 mt-2">
                Puedes registrarte usando el botón de "Registrarse" en el encabezado de la página. Solo necesitas proporcionar tu nombre, correo electrónico, y crear una contraseña.
              </p>
            )}
          </div>

          {/* Pregunta 2 */}
          <div className="faq-item bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <div
              className="faq-question cursor-pointer flex justify-between items-center"
              onClick={() => toggleAnswer('question2')}
            >
              <h3 className="text-xl font-semibold text-gray-800">¿Cómo puedo encontrar proyectos relevantes?</h3>
              <span>{activeQuestion === 'question2' ? '-' : '+'}</span>
            </div>
            {activeQuestion === 'question2' && (
              <p className="text-gray-600 mt-2">
                Utiliza nuestra herramienta de búsqueda avanzada para filtrar proyectos según tus intereses, habilidades y ubicación.
              </p>
            )}
          </div>

          {/* Pregunta 3 */}
          <div className="faq-item bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <div
              className="faq-question cursor-pointer flex justify-between items-center"
              onClick={() => toggleAnswer('question3')}
            >
              <h3 className="text-xl font-semibold text-gray-800">¿Puedo proteger mi propiedad intelectual?</h3>
              <span>{activeQuestion === 'question3' ? '-' : '+'}</span>
            </div>
            {activeQuestion === 'question3' && (
              <p className="text-gray-600 mt-2">
                Sí, ofrecemos opciones de privacidad y licencias para proteger tus proyectos y trabajos académicos.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
