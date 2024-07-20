import { pool } from '../database/conexion.js';

export const registrarAdopcion = async (req, res) => {
    try {
      const { id_adopcion, fk_id_mascota, fk_id_usuario, fecha, estado} = req.body;
  
  
      const [result] = await pool.query(
        `INSERT INTO adopcion ( id_adopcion, fk_id_mascota, fk_id_usuario, fecha, estado) VALUES (?, ?, ?, ?, ?)`,
        [id_adopcion, fk_id_mascota, fk_id_usuario, fecha, estado]
      );
  
      if (result.affectedRows > 0) {
        res.status(200).json({
          status: 200,
          message: 'Se registró con éxito la adopcion '
        });
      } else {
        res.status(403).json({
          status: 403,
          message: 'No se registró la adopcion'
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: 'Error del servidor: ' + error.message
      });
    }
  };
  
  export const listarAdopcion = async (req, res) => {
    try {
    const { id_adopcion } = req.params;
  
    const [result] = await pool.query("SELECT * FROM adopcion WHERE id_adopcion", [id_adopcion]);
  
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                status: 404,
                message: "No se encontró la adopcion"
            });
        }
    } catch (error) {
        res.status(500).json({ 
            status: 500, 
            message: 'Error en el sistema: ' + error 
        });
    }
  };

  export const buscarAdopcion = async (req, res) => {
    try {
    const { id_adopcion } = req.params;
  
    const [result] = await pool.query("SELECT * FROM adopcion WHERE id_adopcion=?", [id_adopcion]);
  
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                status: 404,
                message: "No se encontró la adopcion"
            });
        }
    } catch (error) {
        res.status(500).json({ 
            status: 500, 
            message: 'Error en el sistema: ' + error 
        });
    }
  };
  

  export const actualizarAdopcion = async (req, res) => {
    try {
      const { id_adopcion } = req.params;
      const {
        fk_id_mascota, fk_id_usuario, fecha, estado
      } = req.body;
  
      // Verificar que al menos uno de los campos esté presente en la solicitud
      if (!fk_id_mascota && !fk_id_usuario && !fecha && !estado) {
        return res.status(400).json({
          message: 'Al menos uno de los campos ( fk_id_mascota, fk_id_usuario, fecha, estado) debe estar presente en la solicitud para realizar la actualización.'
        });
      }
  
      const [oldAdopcion] = await pool.query("SELECT * FROM adopcion WHERE id_adopcion = ?", [id_adopcion]);
  
      if (oldAdopcion.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'Mascota no encontrada',
        });
      }
  
      // Crear un objeto con los valores actualizados
      const updateAdopcion = {
        fk_id_mascota: fk_id_mascota || oldAdopcion[0].fk_id_mascota,
        fk_id_usuario: fk_id_usuario || oldAdopcion[0].fk_id_usuario,
        fecha: fecha || oldAdopcion[0].fecha,
        estado: estado || oldAdopcion[0].estado
      };
  
      // Ejecutar la consulta de actualización
      const [result] = await pool.query(
        `UPDATE adopcion SET fk_id_mascota=?, fk_id_usuario=?, fecha=?, estado=? WHERE id_adopcion = ?`,
        [
          updateAdopcion.fk_id_mascota, updateAdopcion.fk_id_usuario, updateAdopcion.fecha, 
          updateAdopcion.estado,
          id_adopcion
        ]
      );
  
      // Verificar el resultado de la consulta
      if (result.affectedRows > 0) {
        res.status(200).json({
          status: 200,
          message: "La adopcion ha sido actualizada correctamente.",
        });
      } else {
        res.status(404).json({
          status: 404,
          message: "No se pudo actualizar la adopcion, inténtalo de nuevo.",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error en el sistema: " + error.message,
      });
    }
  };
  