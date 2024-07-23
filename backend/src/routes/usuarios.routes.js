import { Router } from "express"
import  {registrarAdoptante, listarUsuarios, buscarUsuarios, actualizarUsuario, registrarUsuarios} from '../controllers/usuarios.controller.js';



const rutaUsuario = Router();

rutaUsuario.post('/registrarAdoptante', registrarAdoptante);
rutaUsuario.post('/registrarUsuario', registrarUsuarios);
rutaUsuario.get('/listarUsuario', listarUsuarios);
rutaUsuario.get('/buscarUsuario/:id_usuarios', buscarUsuarios);
rutaUsuario.put('/actualizarUsuario/:id_usuarios', actualizarUsuario);

export default rutaUsuario;
