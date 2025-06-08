import { useEffect, useState } from 'react';
import axios from 'axios';

export const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Tu Perfil</h2>
      {user && (
        <pre>{JSON.stringify(user, null, 2)}</pre>
      )}
    </div>
  );
};