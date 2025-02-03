import express, { Request, response, Response } from 'express';
import speakeasy from 'speakeasy';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const SECRET = 'TU_SECRET_BASE32';  // Usa la misma clave que configuraste en Google Authenticator

// Ruta para generar el secret (si es necesario)
app.get('/api/generate-secret', (req: Request, res: Response) => {
  const secret = speakeasy.generateSecret({ length: 20 });
  res.json({ secret: secret.base32 });
});

// Ruta para verificar el token
app.post('/api/verify-token', (Request: any, Response: any) => {
  const { token } = Request.body;

  if (!token) {
    return Response.status(400).json({ message: 'El token es requerido' });
  }

  // Verificar si el token es válido
  const isValid = speakeasy.totp.verify({
    secret: SECRET,
    encoding: 'base32',
    token,
    window: 1,
  });

  if (isValid) {
    return Response.json({ valid: true });
  } else {
    return Response.status(400).json({ valid: false, message: 'Token incorrecto' });
  }
});

// Iniciar el servidor
app.listen(5000, () => {
  console.log('Servidor en http://localhost:5000');
});
