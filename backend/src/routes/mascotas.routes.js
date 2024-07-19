import { Router } from "express"
import  {listarMascota, registrarMascota} from '../controllers/mascotas.controller.js';



const rutaMascota = Router();

rutaMascota.post('/registrarM', registrarMascota);
rutaMascota.get('/listarM', listarMascota);

export default rutaMascota;
