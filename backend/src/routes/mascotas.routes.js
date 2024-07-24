import express from 'express';
import {
    listarMascotas,
    buscarMascotas,
    actualizarMascota,
    registrarMascota
} from '../controllers/mascotas.controller.js';
import multer from 'multer';

const router = express.Router();

// Middleware para manejar la carga de archivos
const upload = multer({ dest: 'uploads/' });

// Rutas
router.post('/registrarM', upload.single('imagen'), registrarMascota);
router.get('/listarM', listarMascotas);
router.get('/buscarM/:id_mascotas', buscarMascotas);
router.put('/actualizarM/:id_mascotas', actualizarMascota);

export default router;