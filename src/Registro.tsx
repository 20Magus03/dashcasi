import { Link } from 'react-router-dom';
import '../src/css/Formulario.css';
import React from 'react';

const Registro = () => {
  return (
    <div className="container">
      <div className="form-box">
        <h1>Mr. Magus</h1>
        <h2 className="title">Registro</h2>
        <form>
          <div className="input-group">
            <input type="text" placeholder="Introduce nombre completo" className="input" />
          </div>
          <div className="input-group">
            <input type="email" placeholder="Introduce el correo" className="input" />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Introduce la contraseña" className="input" />
          </div>
          <Link to="/login" className="btn">Crear</Link>
        </form>
        <p className="text">
          ¿Ya tienes una cuenta? <Link to="/Login" className="link">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Registro;
