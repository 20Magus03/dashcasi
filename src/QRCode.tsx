import { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import React from 'react';

const QRCodeComponent = () => {
  const [qrCode, setQrCode] = useState<string>('');
  const username = localStorage.getItem('username'); // Usamos username en lugar de email

  useEffect(() => {
    if (!username) return;

    const fetchQRCode = async () => {
      try {
        const response = await fetch('http://localhost:3001/auth/generate-2fa', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username }), // Enviamos username en lugar de email
        });

        const data = await response.json();
        setQrCode(data.qrCodeDataUrl);
      } catch (error) {
        console.error('Error al obtener QR:', error);
      }
    };

    fetchQRCode();
  }, [username]);

  return (
    <div>
      <h2>Escanea el código QR con Google Authenticator</h2>
      {qrCode && <QRCode value={qrCode} />}
    </div>
  );
};

export default QRCodeComponent;
