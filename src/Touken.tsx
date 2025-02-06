import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TokenInput = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    const email = localStorage.getItem('email');

    if (!email) {
      setError('No se encontró el email del usuario');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/verify-2fa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token }),
      });

      const data = await response.json();

      if (response.ok && data.isValid) {
        navigate('/dashboard'); // Redirige al Dashboard si el token es válido
      } else {
        setError('Token incorrecto');
      }
    } catch (error) {
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div className="token-container">
      <h2>Ingrese el código de autenticación</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="123456"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        maxLength={6}
      />
      <button onClick={handleSubmit}>Verificar</button>
    </div>
  );
};

export default TokenInput;
