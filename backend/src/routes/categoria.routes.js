import { Router } from "express"
import  { actualizarCategoria, buscarCategoria, listarCategoria, registrarCategoria } from '../controllers/categoria.controllers.js';



const rutaCategoria = Router();

rutaCategoria.post('/registrarC', registrarCategoria);
rutaCategoria.get('/listarC', listarCategoria);
rutaCategoria.get('/buscarC/:id_categoria', buscarCategoria);
rutaCategoria.put('/actualizarC/:id_categoria', actualizarCategoria);


export default rutaCategoria;
