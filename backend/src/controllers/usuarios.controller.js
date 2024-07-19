import { pool } from '../database/conexion.js';

export const registrarAdmin = async (req, res) => {
    try {
      const { nombre_usuario, apellidos_usuario, correo_usuario, contrasena, photo, rol, telefono, identificacion, fk_id_mascota } = req.body;
  
      const estado = 'activo';
  
      const [result] = await pool.query(
        `INSERT INTO usuarios (nombre_usuario, apellidos_usuario, correo_usuario, contrasena, photo, rol, telefono, identificacion, fk_id_mascota) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [nombre_usuario, apellidos_usuario, correo_usuario, contrasena, photo, rol, telefono, identificacion, fk_id_mascota]
      );
  
      if (result.affectedRows > 0) {
        res.status(200).json({
          status: 200,
          message: 'Se registró con éxito el administrador ' + nombre_usuario
        });
      } else {
        res.status(403).json({
          status: 403,
          message: 'No se registró el admnistrador'
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: 'Error del servidor: ' + error.message
      });
    }
  };


  export const registrarUsuarios = async (req, res) => {
    try {
      // Extraer datos del cuerpo de la solicitud
      const { nombre_usuario, apellidos_usuario, correo_usuario, contrasena, photo, rol, telefono, identificacion } = req.body;
  
  
      // Obtener la identificación del administrador que hace la solicitud desde el token, si está disponible
      const admin_id = req.usuario;
  
      // Determinar el rol a asignar
      let userRole = rol;
      if (rol === 'administrador') {
        const [adminCheck] = await pool.query('SELECT COUNT(*) AS adminCount FROM usuarios WHERE rol = "adoptante"');
        if (adminCheck[0].adminCount > 0) {
          userRole = 'adoptante'; // Solo puede haber un administrador
        }
      } else {
        userRole = 'adoptante';
      }
  
      const estado = 'activo';
  
      // Realizar el registro del usuario en la base de datos
      const query = `
        INSERT INTO usuarios (nombre_usuario, apellidos_usuario, correo_usuario, contrasena, photo, rol, telefono, identificacion) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
  
      const values = [nombre_usuario, apellidos_usuario, correo_usuario, contrasena, photo, userRole, telefono, identificacion];
  
      // Ejecutar la consulta SQL
      const [result] = await pool.query(query, values);
  
      // Retornar una respuesta de éxito
      return res.status(200).json({ 
        message: 'Usuario registrado exitosamente',
      });
    } catch (error) {
      // Manejar errores
      console.error('Error al registrar usuario:', error);
      return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
  };
  
export const listarUsuarios = async (req, res) => {
    try {
        const id_usuarios = req.usuario;

        const [result] = await pool.query('SELECT * FROM usuarios WHERE id_usuarios = ?', [id_usuarios]);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                status: 404,
                message: 'No se encontraron usuarios registrados por este administrador'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error en el sistema',
            error: error.message
        });
    }
};



export const buscarUsuarios = async (req, res) => {
    try {
    const { id_usuarios } = req.params;

    const [result] = await pool.query("SELECT * FROM usuarios WHERE id_usuarios=?", [id_usuarios]);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                status: 404,
                message: "No se encontró un asuario con esa id_usuarios"
            });
        }
    } catch (error) {
        res.status(500).json({ 
            status: 500, 
            message: 'Error en el sistema: ' + error 
        });
    }
};

export const actualizarUsuario = async (req, res) => {
    try {

        const { id_usuarios } = req.params;
        const { nombre_usuario, apellidos_usuario, correo_usuario, contrasena, photo, rol, telefono, identificacion, fk_id_mascota} = req.body;

        if (!nombre_usuario && !apellidos_usuario && !correo_usuario && !contrasena && !photo  && !rol && !telefono && !identificacion && !fk_id_mascota) {
            return res.status(400).json({ message: 'Al menos uno de los campos ( nombre_usuario, apellidos_usuario, correo_usuario, contrasena, photo, rol, telefono, identificacion, fk_id_mascota) debe estar presente en la solicitud para realizar la actualización.' });
        }

        const [oldUsuario] = await pool.query("SELECT * FROM usuarios WHERE id_usuarios = ?", [id_usuarios]);

        if (oldUsuario.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'Usuario no encontrado',
            });
        }

        const updatedUsuario = {
            id_usuarios: id_usuarios || oldUsuario[0].id_usuarios,
            nombre_usuario: nombre_usuario || oldUsuario[0].nombre_usuario,
            apellidos_usuario: apellidos_usuario || oldUsuario[0].apellidos_usuario,
            correo_usuario: correo_usuario || oldUsuario[0].correo_usuario,
            photo: photo || oldUsuario[0].photo,
            telefono: telefono || oldUsuario[0].telefono,
            identificacion: identificacion || oldUsuario[0].identificacion,
            contrasena: contrasena || oldUsuario[0].contrasena,
            rol: rol || oldUsuario[0].rol,
            fk_id_mascota: fk_id_mascota || oldUsuario[0].fk_id_mascota,
        };

        const [result] = await pool.query(
            `UPDATE usuarios SET identificacion=?, nombre_usuario=?, apellidos_usuario=?, correo_usuario=?, photo=?, telefono=?, contrasena=?, rol=?  WHERE id_usuarios = ?`,
            [updatedUsuario.identificacion, updatedUsuario.nombre_usuario, updatedUsuario.apellidos_usuario, updatedUsuario.correo_usuario, updatedUsuario.photo, updatedUsuario.telefono, updatedUsuario.contrasena, updatedUsuario.rol, updatedUsuario.fk_id_mascota, id_usuarios]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({
                status: 200,
                message: "El usuario ha sido actualizado.",
            });
        } else {
            res.status(404).json({
                status: 404,
                message: "No se pudo actualizar el usuario, inténtalo de nuevo.",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message:"Error en el sistema"+ error.message,
        });
    }
};