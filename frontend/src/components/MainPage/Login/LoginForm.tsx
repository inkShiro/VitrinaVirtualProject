import React, { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar el correo electrónico
    if (email === 'estudiante@gmail.com') {
      localStorage.setItem('accountType', 'estudiante');
      window.location.href = '/dashboard';
    } else if (email === 'empresa@gmail.com') {
      localStorage.setItem('accountType', 'empresa');
      window.location.href = '/dashboard';
    } else {
      setError('Correo electrónico no válido.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Correo Electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <a href="#" className="text-sm text-blue-600 hover:underline">
        ¿Olvidaste tu contraseña?
      </a>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Iniciar Sesión
      </button>
    </form>
  );
}
