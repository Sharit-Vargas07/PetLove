import { Router } from "express"
import  { validar } from '../controllers/autenticacion.js';

const rutaValidacion = Router();

rutaValidacion.post('/validar', validar);

export default rutaValidacion;