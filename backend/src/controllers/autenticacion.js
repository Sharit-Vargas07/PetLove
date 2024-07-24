import { pool } from "../database/conexion.js";
import Jwt from "jsonwebtoken";

export const validar = async (req, res) => {
  try {
    const { correo_usuario, contrasena } = req.body;
    const sql = `SELECT * FROM usuarios WHERE correo_usuario = ? AND contrasena = ?`;

    const [rows] = await pool.query(sql, [correo_usuario, contrasena]);

    if (rows.length > 0) {
      const user = rows[0];
      const token = Jwt.sign({ 
        userId: user.id_usuario, 
        role: user.rol // Asumiendo que la columna de rol es "rol"
      }, process.env.AUT_SECRET, { expiresIn: process.env.AUT_EXPIRE });

      return res.status(200).json({ user, token, message: 'token generado con éxito' });
    } else {
      return res.status(404).json({ message: "Usuario no autorizado" });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Error del servidor: ' + error.message });
  }
};

export const validarToken = async (req, res, next) => {
  try {
    const tokenClient = req.headers['token'];

    if (!tokenClient) {
      return res.status(403).json({ message: 'Token es requerido' });
    } else {
      Jwt.verify(tokenClient, process.env.AUT_SECRET, (error, decoded) => {
        if (error) {
          return res.status(403).json({ message: 'Token es inválido o ha expirado' });
        } else {
          req.usuario = decoded.user;
          next();
        }
      });
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error del servidor: ' + error.message });
  }
};
