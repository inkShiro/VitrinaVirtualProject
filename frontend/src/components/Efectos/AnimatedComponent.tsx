// src/components/AnimatedComponent.tsx}
"use client";
import React, { useEffect, useRef, useState } from 'react';

const AnimatedComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false); // Estado de visibilidad

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // Cambia a visible
          } else {
            setIsVisible(false); // Cambia a invisible
          }
        });
      },
      { threshold: 0.1 } // Cambia cuando el 10% del componente es visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.95)', // Zoom suave
        transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out', // Transición de opacidad y zoom
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedComponent;
