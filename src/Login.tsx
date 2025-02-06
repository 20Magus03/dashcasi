import React, { useState } from 'react';
import axios from 'axios';

const Verify2FA: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleVerify2FA = async () => {
    try {
      const response = await axios.post('http://localhost:3001/auth/verify-2fa', {
        username,
        token,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error al verificar el código 2FA');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Código 2FA"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button onClick={handleVerify2FA}>Verificar 2FA</button>
      <p>{message}</p>
    </div>
  );
};

export default Verify2FA;
