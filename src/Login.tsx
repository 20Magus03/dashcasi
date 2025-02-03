import { Link, useNavigate } from 'react-router-dom';
import '../src/css/Formulario.css';
import React, { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página se recargue

    // Verificar credenciales
    if (email === 'admin' && password === '123456') {
      navigate('/dashboard'); // Redirigir al Dashboard
    } else {
      navigate('/Touken'); // Redirigir a la página de Token
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h1>Mr. Magus</h1>
        <h2 className="title">INICIO DE SESIÓN</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Introduce el correo" 
              className="input" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Introduce la contraseña" 
              className="input" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <button type="submit" className="btn">Iniciar Sesión</button>
        </form>
        <p className="text">
          ¿No tienes una cuenta? <Link to="/" className="link">Crea una</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
