import { useEffect, useState } from 'react';
import axios from 'axios';

export const Comunidades = () => {
  const [comunidades, setComunidades] = useState([]);

  useEffect(() => {
    const fetchComunidades = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/comunidades', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComunidades(res.data);
    };
    fetchComunidades();
  }, []);

  return (
    <div>
      <h2>Comunidades</h2>
      <ul>
        {comunidades.map((cat: any) => (
          <li key={cat.id}>
            <strong>{cat.nombre}</strong>
            <ul>
              {cat.chats.map((chat: any) => (
                <li key={chat.id}>{chat.nombre}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};