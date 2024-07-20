import { Router } from "express"
import  { actualizarRaza, buscarRaza, listarRaza, registrarRaza } from '../controllers/raza.controller.js';



const rutaRaza = Router();

rutaRaza.post('/registrarR', registrarRaza);
rutaRaza.get('/listarR', listarRaza);
rutaRaza.get('/buscarR/:id_raza', buscarRaza);
rutaRaza.put('/actualizarR/:id_raza', actualizarRaza);


export default rutaRaza;
