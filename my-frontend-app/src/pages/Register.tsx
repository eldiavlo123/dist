import { useState } from 'react';
import axios from 'axios';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:3000/auth/register', {
        correo: email,
        contrasena: password,
        nombre: name,
      });

      alert('Registro exitoso');
      window.location.href = '/login'; // Redirige al login después del registro
    } catch (error) {
      alert('Error al registrar usuario');
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleRegister}>Registrarse</button>
    </div>
  );
};