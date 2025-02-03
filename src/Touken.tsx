import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/token.css"; 

const TokenInput: React.FC = () => {
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, ""); 
    setToken(value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/verify-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok && data.valid) {
      } else {
        setError("Token incorrecto");
      }
    } catch (error) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="token-container">
      <div className="token-box">
        <h2 className="token-title">Ingresa un código</h2>
        <input
          type="text"
          className="token-input"
          placeholder="123456"
          value={token}
          onChange={handleChange}
          maxLength={6}
        />
        <Link to="/ClientDashboard" className="boton">
          Verificar
        </Link>
      </div>

    </div>
  );
};

export default TokenInput;
