import { Router } from "express"
import  {actualizarMascota, buscarMascotas, listarMascotas, registrarMascota} from '../controllers/mascotas.controller.js';



const rutaMascota = Router();

rutaMascota.post('/registrarM', registrarMascota);
rutaMascota.get('/listarM', listarMascotas);
rutaMascota.get('/buscarM/:id_mascotas', buscarMascotas);
rutaMascota.put('/actualizarM/:id_mascotas', actualizarMascota);

export default rutaMascota;
