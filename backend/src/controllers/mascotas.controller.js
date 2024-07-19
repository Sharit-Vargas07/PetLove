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
