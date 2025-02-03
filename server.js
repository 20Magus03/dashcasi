const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/miapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  secret: String,
  is2FAEnabled: Boolean
});

const User = mongoose.model("User", UserSchema);


app.post("/register", async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, is2FAEnabled: false });
    await user.save();
    res.json({ message: "Usuario registrado correctamente" });
  });

  app.post("/setup-2fa", async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });
  
    // Generar clave secreta para Google Authenticator
    const secret = speakeasy.generateSecret({ length: 20 });
    
    // Guardar la clave en la BD
    user.secret = secret.base32;
    user.is2FAEnabled = true;
    await user.save();
  
    // Generar código QR para Google Authenticator
    qrcode.toDataURL(secret.otpauth_url, (err, qr) => {
      res.json({ secret: secret.base32, qr });
    });
  });

  app.post("/login", async (req, res) => {
    const { email, password, totp_code } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Contraseña incorrecta" });
  
    // Si el usuario tiene 2FA activado, validamos el código de Google Authenticator
    if (user.is2FAEnabled) {
      const isValid = speakeasy.totp.verify({
        secret: user.secret,
        encoding: "base32",
        token: totp_code,
        window: 1 // Permite un margen de error de 30 segundos
      });
  
      if (!isValid) return res.status(400).json({ message: "Código de Google Authenticator incorrecto" });
    }
  
    // Generar token JWT
    const token = jwt.sign({ email: user.email }, "secreto", { expiresIn: "1h" });
  
    res.json({ message: "Inicio de sesión exitoso", token });
  });
  