import express  from 'express' 
import  body_parser from 'body-parser'
import cors from 'cors'
import rutaUsuario from './src/routes/usuarios.routes.js'
import rutaMascota from './src/routes/mascotas.routes.js'
import rutaAdopcion from './src/routes/adopcion.routes.js'
import rutaCategoria from './src/routes/categoria.routes.js'
import rutaRaza from './src/routes/raza.routes.js'


//servidor
const servidor = express()

servidor.use(cors())
servidor.use(body_parser.json())
servidor.use(body_parser.urlencoded({extended: false}))

servidor.listen(3000, () =>{
    console.log("esta funcionando en el puerto 3000")
})

//ruta
servidor.use('/usuario',rutaUsuario)
servidor.use('/mascota',rutaMascota)
servidor.use('/adopcion',rutaAdopcion)
servidor.use('/categoria',rutaCategoria)
servidor.use('/raza',rutaRaza)


//carpetas documentacion
/* servidor.set('view engine', 'ejs');
servidor.set('views','./views');
servidor.get('/documents',(req,res)=>{
    res.render('document.ejs');
}) */
servidor.use(express.static('./public'));

