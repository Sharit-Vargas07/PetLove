import { pool } from '../database/conexion.js';

export const registrarRaza = async (req, res) => {
    try {
      const { id_raza, nombre} = req.body;

      const [result] = await pool.query(
        `INSERT INTO raza ( id_raza, nombre) VALUES (?, ?)`,
        [id_raza, nombre]
      );
  
      if (result.affectedRows > 0) {
        res.status(200).json({
          status: 200,
          message: 'Se registró con éxito la raza '
        });
      } else {
        res.status(403).json({
          status: 403,
          message: 'No se registró la raza'
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: 'Error del servidor: ' + error.message
      });
    }
  };
  
  export const listarRaza = async (req, res) => {
    try {
    const { id_raza } = req.params;
  
    const [result] = await pool.query("SELECT * FROM raza WHERE id_raza", [id_raza]);
  
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                status: 404,
                message: "No se encontró la raza"
            });
        }
    } catch (error) {
        res.status(500).json({ 
            status: 500, 
            message: 'Error en el sistema: ' + error 
        });
    }
  };

  export const buscarRaza = async (req, res) => {
    try {
    const { id_raza } = req.params;
  
    const [result] = await pool.query("SELECT * FROM raza WHERE id_raza=?", [id_raza]);
  
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                status: 404,
                message: "No se encontró la raza"
            });
        }
    } catch (error) {
        res.status(500).json({ 
            status: 500, 
            message: 'Error en el sistema: ' + error 
        });
    }
  };
  

  export const actualizarRaza = async (req, res) => {
    try {
      const { id_raza } = req.params;
      const {
       nombre
      } = req.body;
  
      // Verificar que al menos uno de los campos esté presente en la solicitud
      if (!nombre) {
        return res.status(400).json({
          message: 'Al menos uno de los campos (nombre) debe estar presente en la solicitud para realizar la actualización.'
        });
      }
  
      const [oldRaza] = await pool.query("SELECT * FROM raza WHERE id_raza = ?", [id_raza]);
  
      if (oldRaza.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'Mascota no encontrada',
        });
      }
  
      // Crear un objeto con los valores actualizados
      const updateRaza = {
        nombre: nombre || oldRaza[0].nombre,
      };
  
      // Ejecutar la consulta de actualización
      const [result] = await pool.query(
        `UPDATE raza SET nombre=? WHERE id_raza = ?`,
        [
          updateRaza.nombre,
          id_raza
        ]
      );
  
      // Verificar el resultado de la consulta
      if (result.affectedRows > 0) {
        res.status(200).json({
          status: 200,
          message: "La raza ha sido actualizada correctamente.",
        });
      } else {
        res.status(404).json({
          status: 404,
          message: "No se pudo actualizar la raza, inténtalo de nuevo.",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error en el sistema: " + error.message,
      });
    }
  };
  