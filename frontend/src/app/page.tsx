// src/pages/HomePage.tsx
"use client"
import React, { useEffect, useState } from 'react';
import Header from '../components/MainPage/Header';
import HeroSection from '../components/MainPage/HeroSection';
import FeaturedProjects from '../components/MainPage/FeaturedProjects';
import FeaturesSection from '../components/MainPage/FeaturesSection';
import TestimonialsSection from '../components/MainPage/TestimonialsSection';
import FAQSection from '../components/MainPage/FAQSection';
import ContactForm from '../components/MainPage/ContactForm';
import Footer from '../components/MainPage/Footer';
import AnimatedComponent from '../components/Efectos/AnimatedComponent';
import AdminPanel from '../components/MainPage/AdminPanel';

export default function HomePage() {
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Detectar la combinación de teclas Control + Alt + C
      if (event.ctrlKey && event.altKey && event.key === 'c') {
        setIsAdminPanelOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
      <Header />
      <AnimatedComponent>
        <section id="inicio">
          <HeroSection />
        </section>
      </AnimatedComponent>
      <AnimatedComponent>
        <section id="features">
          <FeaturesSection />
        </section>
      </AnimatedComponent>
      <AnimatedComponent>
        <section id="projects">
          <FeaturedProjects />
        </section>
      </AnimatedComponent>
      <AnimatedComponent>
        <section id="testimonials">
          <TestimonialsSection />
        </section>
      </AnimatedComponent>
      <AnimatedComponent>
        <section id="faq">
          <FAQSection />
        </section>
      </AnimatedComponent>
      <AnimatedComponent>
        <section id="contact">
          <ContactForm />
        </section>
      </AnimatedComponent>
      <Footer />

      {/* Panel de configuración para administradores */}
      {isAdminPanelOpen && <AdminPanel onClose={() => setIsAdminPanelOpen(false)} />}
    </div>
  );
}
