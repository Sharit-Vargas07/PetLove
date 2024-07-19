import { pool } from '../database/conexion.js';

export const registrarMascota = async (req, res) => {
    try {
      const { id_mascotas, nombre_mascotas, genero_mascotas, edad_mascota, tamaño_mascota, color_mascota, peso_mascota, esterilizacion, vacunas, desparacitacion, fecha_ult_desparacitacion, discapacidad, descripcion_discapacidad,energia, compatibilidad_ninos, compatibilidad_otros_animales, imagen, estado, fk_id_categoria, fk_id_raza } = req.body;
  
  
      const [result] = await pool.query(
        `INSERT INTO mascotas ( id_mascotas, nombre_mascotas, genero_mascotas, edad_mascota, tamaño_mascota, color_mascota, peso_mascota, esterilizacion, vacunas, desparacitacion, fecha_ult_desparacitacion, discapacidad, descripcion_discapacidad,energia, compatibilidad_ninos, compatibilidad_otros_animales, imagen, estado, fk_id_categoria, fk_id_raza) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id_mascotas, nombre_mascotas, genero_mascotas, edad_mascota, tamaño_mascota, color_mascota, peso_mascota, esterilizacion, vacunas, desparacitacion, fecha_ult_desparacitacion, discapacidad, descripcion_discapacidad,energia, compatibilidad_ninos, compatibilidad_otros_animales, imagen, estado,  fk_id_categoria, fk_id_raza]
      );
  
      if (result.affectedRows > 0) {
        res.status(200).json({
          status: 200,
          message: 'Se registró con éxito la mascota ' + nombre_mascotas
        });
      } else {
        res.status(403).json({
          status: 403,
          message: 'No se registró la mascota'
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: 'Error del servidor: ' + error.message
      });
    }
  };

  /* El controlador de listar NO SIRVE corregir */
  export const listarMascota = async (req, res) => {
    try {

      const id_mascotas = req.usuario;

        const [result] = await pool.query('SELECT * FROM mascotas WHERE id_mascotas = ?', [id_mascotas]);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                status: 404,
                message: 'No se encontraron mascotas registradas'
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


export const buscarMascotas = async (req, res) => {
  try {
  const { id_mascotas } = req.params;

  const [result] = await pool.query("SELECT * FROM mascotas WHERE id_mascotas=?", [id_mascotas]);

      if (result.length > 0) {
          res.status(200).json(result);
      } else {
          res.status(404).json({
              status: 404,
              message: "No se encontró la mascota"
          });
      }
  } catch (error) {
      res.status(500).json({ 
          status: 500, 
          message: 'Error en el sistema: ' + error 
      });
  }
};


export const actualizarMascota = async (req, res) => {
  try {

      const { id_mascotas } = req.params;
      const { nombre_mascotas, genero_mascotas, edad_mascota, tamaño_mascota, color_mascota, peso_mascota, esterilizacion, vacunas, desparacitacion, fecha_ult_desparacitacion, discapacidad, descripcion_discapacidad,energia, compatibilidad_ninos, compatibilidad_otros_animales, imagen, estado, fk_id_categoria, fk_id_raza} = req.body;

      if (!nombre_mascotas && !genero_mascotas && !edad_mascota && !tamaño_mascota && !color_mascota  && !peso_mascota && !esterilizacion && !vacunas && !desparacitacion && !fecha_ult_desparacitacion && !discapacidad && !descripcion_discapacidad && !energia && !compatibilidad_ninos && !compatibilidad_otros_animales && !imagen && !estado &&!fk_id_ ) {
          return res.status(400).json({ message: 'Al menos uno de los campos ( nombre_mascotas, genero_mascotas, edad_mascota, tamaño_mascota, color_mascota, peso_mascota, esterilizacion, vacunas, desparacitacion, fecha_ult_desparacitacion, discapacidad, descripcion_discapacidad,energia, compatibilidad_ninos, compatibilidad_otros_animales, imagen, estado, fk_id_categoria, fk_id_raza) debe estar presente en la solicitud para realizar la actualización.' });
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