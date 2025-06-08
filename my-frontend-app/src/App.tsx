// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Comunidades from './pages/Comunidades';
import Profile from './pages/Profile';
import Logout from './pages/Logout';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/login">Login</Link> |{' '}
        <Link to="/register">Registro</Link> |{' '}
        <Link to="/comunidades">Comunidades</Link> |{' '}
        <Link to="/profile">Perfil</Link> |{' '}
        <Link to="/logout">Logout</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/comunidades" element={<Comunidades />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;