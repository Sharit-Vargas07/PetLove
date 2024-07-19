import { Router } from "express"
import  {buscarMascotas, listarMascota, registrarMascota} from '../controllers/mascotas.controller.js';



const rutaMascota = Router();

rutaMascota.post('/registrarM', registrarMascota);
rutaMascota.get('/listarM', listarMascota);
rutaMascota.get('/buscarM/:id_mascotas', buscarMascotas);

export default rutaMascota;
