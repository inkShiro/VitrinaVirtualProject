import React from 'react';
import Header from '../components/MainPage/Header';
import HeroSection from '../components/MainPage/HeroSection';
import FeaturedProjects from '../components/MainPage/FeaturedProjects';
import FeaturesSection from '../components/MainPage/FeaturesSection';
import TestimonialsSection from '../components/MainPage/TestimonialsSection';
import FAQSection from '../components/MainPage/FAQSection';
import ContactForm from '../components/MainPage/ContactForm';
import Footer from '../components/MainPage/Footer';
import AnimatedComponent from '../components/Efectos/AnimatedComponent';

export default function HomePage() {
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
    </div>
  );
}
