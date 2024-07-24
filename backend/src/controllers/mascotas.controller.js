import { pool } from '../database/conexion.js';
import multer from 'multer';
import path from 'path';

// Configuración de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada archivo
    }
});

const upload = multer({ storage: storage });

export const registrarMascota = async (req, res) => {
    try {
        const {
            nombre_mascotas, genero_mascotas, edad_mascota, tamano,
            color_mascota, esterilizacion, vacunas, desparacitacion, fecha_ult_desparacitacion,
            discapacidad, descripcion_discapacidad, compatibilidad_ninos, compatibilidad_otros_animales,
            estado, fk_id_categoria, fk_id_raza, ciudad
        } = req.body;

        // Verificar si la categoría existe
        const [categoriaResult] = await pool.query(
            'SELECT * FROM categoria WHERE id_categoria = ?',
            [fk_id_categoria]
        );

        if (categoriaResult.length === 0) {
            return res.status(400).json({
                status: 400,
                message: 'La categoría especificada no existe'
            });
        }

        const imagen = req.file ? req.file.filename : null;

        const [result] = await pool.query(
            `INSERT INTO mascotas (nombre_mascotas, genero_mascotas, edad_mascota, tamano, color_mascota,
            esterilizacion, vacunas, desparacitacion, fecha_ult_desparacitacion, discapacidad, descripcion_discapacidad,
            compatibilidad_ninos, compatibilidad_otros_animales, imagen, estado, fk_id_categoria, fk_id_raza, ciudad)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                nombre_mascotas, genero_mascotas, edad_mascota, tamano, color_mascota, esterilizacion,
                vacunas, desparacitacion, fecha_ult_desparacitacion, discapacidad, descripcion_discapacidad, compatibilidad_ninos,
                compatibilidad_otros_animales, imagen, estado, fk_id_categoria, fk_id_raza, ciudad
            ]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({
                status: 200,
                message: `Se registró con éxito la mascota ${nombre_mascotas}`
            });
        } else {
            res.status(403).json({
                status: 403,
                message: 'No se registró la mascota'
            });
        }
    } catch (error) {
        console.error('Error en el controlador registrarMascota:', error); // Imprimir detalles del error
        res.status(500).json({
            status: 500,
            message: 'Error del servidor: ' + error.message
        });
    }
};


export const listarMascotas = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM mascotas");

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                status: 404,
                message: "No se encontraron mascotas"
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error en el sistema: ' + error.message
        });
    }
};

export const buscarMascotas = async (req, res) => {
    try {
        const { id_mascotas } = req.params;

        const [result] = await pool.query("SELECT * FROM mascotas WHERE id_mascotas = ?", [id_mascotas]);

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
            message: 'Error en el sistema: ' + error.message
        });
    }
};

export const actualizarMascota = async (req, res) => {
    try {
        const { id_mascotas } = req.params;
        const {
            nombre_mascotas, genero_mascotas, edad_mascota, tamano, color_mascota,
            esterilizacion, vacunas, desparacitacion, fecha_ult_desparacitacion,
            discapacidad, descripcion_discapacidad, compatibilidad_ninos,
            compatibilidad_otros_animales, imagen, estado, fk_id_categoria, ciudad, fk_id_raza
        } = req.body;

        // Verificar que al menos uno de los campos esté presente en la solicitud
        if (!nombre_mascotas && !genero_mascotas && !edad_mascota && !tamano &&
            !color_mascota && !esterilizacion && !vacunas && !desparacitacion &&
            !fecha_ult_desparacitacion && !discapacidad && !ciudad && !descripcion_discapacidad &&
            !compatibilidad_ninos && !compatibilidad_otros_animales &&
            !imagen && !estado && !fk_id_categoria && !fk_id_raza) {
            return res.status(400).json({
                message: 'Al menos uno de los campos debe estar presente en la solicitud para realizar la actualización.'
            });
        }

        // Obtener los datos actuales de la mascota
        const [oldMascota] = await pool.query("SELECT * FROM mascotas WHERE id_mascotas = ?", [id_mascotas]);

        if (oldMascota.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'Mascota no encontrada',
            });
        }

        // Crear un objeto con los valores actualizados
        const updateMascotas = {
            nombre_mascotas: nombre_mascotas || oldMascota[0].nombre_mascotas,
            genero_mascotas: genero_mascotas || oldMascota[0].genero_mascotas,
            edad_mascota: edad_mascota || oldMascota[0].edad_mascota,
            tamano: tamano || oldMascota[0].tamano,
            color_mascota: color_mascota || oldMascota[0].color_mascota,
            esterilizacion: esterilizacion || oldMascota[0].esterilizacion,
            vacunas: vacunas || oldMascota[0].vacunas,
            desparacitacion: desparacitacion || oldMascota[0].desparacitacion,
            fecha_ult_desparacitacion: fecha_ult_desparacitacion || oldMascota[0].fecha_ult_desparacitacion,
            discapacidad: discapacidad || oldMascota[0].discapacidad,
            ciudad: ciudad || oldMascota[0].ciudad,
            descripcion_discapacidad: descripcion_discapacidad || oldMascota[0].descripcion_discapacidad,
            compatibilidad_ninos: compatibilidad_ninos || oldMascota[0].compatibilidad_ninos,
            compatibilidad_otros_animales: compatibilidad_otros_animales || oldMascota[0].compatibilidad_otros_animales,
            imagen: imagen || oldMascota[0].imagen,
            estado: estado || oldMascota[0].estado,
            fk_id_categoria: fk_id_categoria || oldMascota[0].fk_id_categoria,
            fk_id_raza: fk_id_raza || oldMascota[0].fk_id_raza,
        };

        // Ejecutar la consulta de actualización
        const [result] = await pool.query(
            `UPDATE mascotas SET nombre_mascotas=?, genero_mascotas=?, edad_mascota=?, tamano=?, color_mascota=?,
            esterilizacion=?, vacunas=?, desparacitacion=?, fecha_ult_desparacitacion=?, discapacidad=?, descripcion_discapacidad=?,
            compatibilidad_ninos=?, compatibilidad_otros_animales=?, imagen=?, estado=?, ciudad=?, fk_id_categoria=?, fk_id_raza=?
            WHERE id_mascotas = ?`,
            [
                updateMascotas.nombre_mascotas, updateMascotas.genero_mascotas, updateMascotas.edad_mascota,
                updateMascotas.tamano, updateMascotas.color_mascota, updateMascotas.esterilizacion,
                updateMascotas.vacunas, updateMascotas.desparacitacion, updateMascotas.fecha_ult_desparacitacion,
                updateMascotas.discapacidad, updateMascotas.descripcion_discapacidad, updateMascotas.compatibilidad_ninos,
                updateMascotas.compatibilidad_otros_animales, updateMascotas.imagen, updateMascotas.estado, updateMascotas.ciudad,
                updateMascotas.fk_id_categoria, updateMascotas.fk_id_raza, id_mascotas
            ]
        );

        // Verificar el resultado de la consulta
        if (result.affectedRows > 0) {
            res.status(200).json({
                status: 200,
                message: 'Datos actualizados con éxito'
            });
        } else {
            res.status(403).json({
                status: 403,
                message: 'No se actualizaron los datos'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error del servidor: ' + error.message
        });
    }
};