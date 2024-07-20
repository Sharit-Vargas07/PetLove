import { Router } from "express"
import  { actualizarAdopcion, buscarAdopcion, listarAdopcion, registrarAdopcion } from '../controllers/adopcion.controller.js';



const rutaAdopcion = Router();

rutaAdopcion.post('/registrarA', registrarAdopcion);
rutaAdopcion.get('/listarA', listarAdopcion)
rutaAdopcion.get('/buscarA/:id_adopcion', buscarAdopcion)
rutaAdopcion.put('/actualizarA/:id_adopcion', actualizarAdopcion)

export default rutaAdopcion;
