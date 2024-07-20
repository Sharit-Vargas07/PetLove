import { pool } from '../database/conexion.js';

export const registrarCategoria = async (req, res) => {
    try {
      const { id_categoria, nombre} = req.body;

      const [result] = await pool.query(
        `INSERT INTO categoria ( id_categoria, nombre) VALUES (?, ?)`,
        [id_categoria, nombre]
      );
  
      if (result.affectedRows > 0) {
        res.status(200).json({
          status: 200,
          message: 'Se registró con éxito la categoria '
        });
      } else {
        res.status(403).json({
          status: 403,
          message: 'No se registró la categoria'
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: 'Error del servidor: ' + error.message
      });
    }
  };
  
  export const listarCategoria = async (req, res) => {
    try {
    const { id_categoria } = req.params;
  
    const [result] = await pool.query("SELECT * FROM categoria WHERE id_categoria", [id_categoria]);
  
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                status: 404,
                message: "No se encontró la categoria"
            });
        }
    } catch (error) {
        res.status(500).json({ 
            status: 500, 
            message: 'Error en el sistema: ' + error 
        });
    }
  };

  export const buscarCategoria = async (req, res) => {
    try {
    const { id_categoria } = req.params;
  
    const [result] = await pool.query("SELECT * FROM categoria WHERE id_categoria=?", [id_categoria]);
  
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
  

  export const actualizarCategoria = async (req, res) => {
    try {
      const { id_categoria } = req.params;
      const {
       nombre
      } = req.body;
  
      // Verificar que al menos uno de los campos esté presente en la solicitud
      if (!nombre) {
        return res.status(400).json({
          message: 'Al menos uno de los campos (nombre) debe estar presente en la solicitud para realizar la actualización.'
        });
      }
  
      const [oldCategoria] = await pool.query("SELECT * FROM categoria WHERE id_categoria = ?", [id_categoria]);
  
      if (oldCategoria.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'Mascota no encontrada',
        });
      }
  
      // Crear un objeto con los valores actualizados
      const updateCategoria = {
        nombre: nombre || oldCategoria[0].nombre,
      };
  
      // Ejecutar la consulta de actualización
      const [result] = await pool.query(
        `UPDATE categoria SET nombre=? WHERE id_categoria = ?`,
        [
          updateCategoria.nombre,
          id_categoria
        ]
      );
  
      // Verificar el resultado de la consulta
      if (result.affectedRows > 0) {
        res.status(200).json({
          status: 200,
          message: "La categoria ha sido actualizada correctamente.",
        });
      } else {
        res.status(404).json({
          status: 404,
          message: "No se pudo actualizar la categoria, inténtalo de nuevo.",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error en el sistema: " + error.message,
      });
    }
  };
  