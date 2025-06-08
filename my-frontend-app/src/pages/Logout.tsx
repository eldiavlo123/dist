export const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div>
      <h2>Cerrar Sesión</h2>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};