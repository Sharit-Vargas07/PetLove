import React, { useEffect, useState } from 'react';
import v from '../../styles/variables';
import Icon from '../atomos/Icon';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    const [mensaje, setMensaje] = useState('');
    const [formData, setFormData] = useState({
        nombre_mascotas: '',
        genero_mascotas: '',
        edad_mascota: '',
        tamaño_mascota: '',
        color_mascota: '',
        Esterilizacion: '',
        Desparacitacion: '',
        vacunas: '',
        desparacitacion: '',
        fecha_ult_desparacitacion: '',
        discapacidad: '',
        descripcion_discapacidad: '',
        compatibilidad_ninos: '',
        compatibilidad_otros_animales: '',
        estado: 'sin adoptar',
        fk_id_categoria: '',
        fk_id_raza: '',
    });
    const [categorias, setCategorias] = useState([]);
    const [razas, setRazas] = useState([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get('http://localhost:3000/categoria/listarC');
                setCategorias(response.data);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        };

        const fetchRazas = async () => {
            try {
                const response = await axios.get('http://localhost:3000/raza/listarR');
                setRazas(response.data);
            } catch (error) {
                console.error('Error al obtener las razas:', error);
            }
        };

        const fetchMascotas = async () => {
            try {
                const response = await axios.get('http://localhost:3000/mascota/listarM');
                setMascotas(response.data);
            }
        }

        fetchCategorias();
        fetchRazas();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const baseURL = 'http://localhost:3000/mascota/registrarM';
            await axios.post(baseURL, formData);
            setMensaje('Mascota Registrada exitosamente');
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Mascota Registrada Con Exito",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate('/Dashboard');
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
            Swal.fire({
                position: "top-center",
                icon: "error",
                title: "Error al registrar la mascota",
                text: error.response?.data?.message || 'Error interno del servidor',
                showConfirmButton: true,
            });
        }
    };

    return (
        <div>
            <header className={`fixed top-0 left-0 right-0 z-10 flex justify-between items-center px-10 h-14 bg-white shadow-md ${modalOpen ? 'hidden' : 'block'}`}>
                <h1 className="text-3xl font-semibold">PetLove</h1>
                <nav className="flex-grow flex justify-center space-x-24">
                    <a href="#" className="mx-2 text-lg hover:text-[#c5296c] text-[#FA67A7] cursor-pointer">Categorías</a>
                    <a href="#" className="mx-2 text-lg hover:text-[#c5296c] text-[#FA67A7] cursor-pointer">Razas</a>
                    <a href="#" className="mx-2 text-lg hover:text-[#c5296c] text-[#FA67A7] cursor-pointer">Requisitos de Adopcion</a>
                    <a href="#" className="mx-2 text-lg hover:text-[#c5296c] text-[#FA67A7] cursor-pointer">Soporte</a>
                </nav>
                <Icon className="hover:text-[#c5296c] text-[#FA67A7] cursor-pointer" icon={v.iconoPerfil} style={{ width: '30px', height: '30px' }}></Icon>
            </header>

            <div className="flex justify-end">
                <button className="bg-[#A5C454] text-lg text-white p-3 rounded-3xl m-20" onClick={openModal} type="button">
                    Registrar Mascota
                </button>
            </div>

            {modalOpen && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50" onClick={closeModal}>
                    <div className="bg-white p-8 rounded-lg shadow-lg max-h-[80%] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <button onClick={closeModal}>
                            <Icon className="hover:text-[#c5296c] text-[#FA67A7] cursor-pointer" icon={v.iconoCerrar} style={{ width: '20px', height: '20px' }}></Icon>
                        </button>
                        <form className='flex flex-col p-8' onSubmit={handleSubmit}>
                            <h2 className='text-center text-3xl my-5'>Registro de Mascota</h2>
                            <label className='text-xl mb-2'> Nombre:</label>
                            <input
                                type="text"
                                className='mb-4 p-1 rounded-2xl bg-slate-200'
                                id='nombre_mascotas'
                                name='nombre_mascotas'
                                value={formData.nombre_mascotas}
                                onChange={handleChange}
                            />
                            <label className='text-xl mb-2'> Categoría:</label>
                            <select
                                name='fk_id_categoria'
                                id='fk_id_categoria'
                                value={formData.fk_id_categoria}
                                onChange={handleChange}
                                className='mb-4 p-1 rounded-2xl bg-slate-200'
                            >
                                <option value=''>Seleccione una Categoría</option>
                                {categorias.map((item) => (
                                    <option key={item.id_categoria} value={item.id_categoria}>
                                        {item.nombre}
                                    </option>
                                ))}
                            </select>
                            <label className='text-xl mb-2'> Raza:</label>
                            <select
                                name='fk_id_raza'
                                id='fk_id_raza'
                                value={formData.fk_id_raza}
                                onChange={handleChange}
                                className='mb-4 p-1 rounded-2xl bg-slate-200'
                            >
                                <option value=''>Seleccione una Raza</option>
                                {razas.map((item) => (
                                    <option key={item.id_raza} value={item.id_raza}>
                                        {item.nombre}
                                    </option>
                                ))}
                            </select>
                            <label className='text-xl mb-2'> Género:</label>
                            <select
                                name='genero_mascotas'
                                id='genero_mascotas'
                                value={formData.genero_mascotas}
                                onChange={handleChange}
                                className='mb-4 p-1 rounded-2xl bg-slate-200'
                            >
                                <option value=''>Seleccione un Género</option>
                                <option value="Macho">Macho</option>
                                <option value="Hembra">Hembra</option>
                            </select>
                            <label className='text-xl mb-2'> Edad (en meses):</label>
                            <input
                                type="number"
                                className='p-1 rounded-2xl bg-slate-200 mb-4'
                                id='edad_mascota'
                                name='edad_mascota'
                                value={formData.edad_mascota}
                                onChange={handleChange}
                            />
                            <label className='text-xl mb-2'> Tamaño:</label>
                            <select
                                name='tamaño_mascota'
                                id='tamaño_mascota'
                                value={formData.tamaño_mascota}
                                onChange={handleChange}
                                className='p-1 rounded-2xl bg-slate-200 mb-4'
                            >
                                <option value=''>Seleccione un Tamaño</option>
                                <option value="Pequeño">Pequeño</option>
                                <option value="Mediano">Mediano</option>
                                <option value="Grande">Grande</option>
                            </select>
                            <label className='text-xl mb-2'> Color de la Mascota:</label>
                            <input
                                type="text"
                                className='p-1 rounded-2xl bg-slate-200 mb-4'
                                id='color_mascota'
                                name='color_mascota'
                                value={formData.color_mascota}
                                onChange={handleChange}
                            />
                            <label className='text-xl mb-2'> Esterilización:</label>
                            <select
                                name='esterilizacion'
                                id='esterilizacion'
                                value={formData.esterilizacion}
                                onChange={handleChange}
                                className='p-1 rounded-2xl bg-slate-200 mb-4'
                            >
                                <option value=''>Seleccione una opción</option>
                                <option value="Sí">Sí</option>
                                <option value="No">No</option>
                            </select>
                            <label className='text-xl mb-2'> Vacunas:</label>
                            <input
                                type="text"
                                className='p-1 rounded-2xl bg-slate-200 mb-4'
                                id='vacunas'
                                name='vacunas'
                                value={formData.vacunas}
                                onChange={handleChange}
                            />
                            <label className='text-xl mb-2'> Desparasitacion:</label>
                            <select
                                name='Desparacitacion'
                                id='Desparacitacion'
                                value={formData.Desparacitacion}
                                onChange={handleChange}
                                className='p-1 rounded-2xl bg-slate-200 mb-4'
                            >
                                <option value=''>Seleccione una opción</option>
                                <option value="Sí">Sí</option>
                                <option value="No">No</option>
                            </select>
                            <label className='text-xl mb-2'> Fecha última desparasitacion:</label>
                            <input
                                type="date"
                                className='p-1 rounded-2xl bg-slate-200 mb-4'
                                id='fecha_ult_desparacitacion'
                                name='fecha_ult_desparacitacion'
                                value={formData.fecha_ult_desparacitacion}
                                onChange={handleChange}
                            />
                            <label className='text-xl mb-2'> Discapacidad:</label>
                            <select
                                name='discapacidad'
                                id='discapacidad'
                                value={formData.discapacidad}
                                onChange={handleChange}
                                className='p-1 rounded-2xl bg-slate-200 mb-4'
                            >
                                <option value=''>Seleccione una opción</option>
                                <option value="Sí">Sí</option>
                                <option value="No">No</option>
                            </select>
                            {formData.discapacidad === 'Sí' && (
                                <>
                                    <label className='text-xl mb-2'> Descripción de discapacidad:</label>
                                    <input
                                        type="text"
                                        className='p-1 rounded-2xl bg-slate-200 mb-4'
                                        id='descripcion_discapacidad'
                                        name='descripcion_discapacidad'
                                        value={formData.descripcion_discapacidad}
                                        onChange={handleChange}
                                    />
                                </>
                            )}
                            <label className='text-xl mb-2'> Compatibilidad con niños:</label>
                            <select
                                name='compatibilidad_ninos'
                                id='compatibilidad_ninos'
                                value={formData.compatibilidad_ninos}
                                onChange={handleChange}
                                className='p-1 rounded-2xl bg-slate-200 mb-4'
                            >
                                <option value=''>Seleccione una opción</option>
                                <option value="Sí">Sí</option>
                                <option value="No">No</option>
                            </select>
                            <label className='text-xl mb-2'> Compatibilidad con otros animales:</label>
                            <select
                                name='compatibilidad_otros_animales'
                                id='compatibilidad_otros_animales'
                                value={formData.compatibilidad_otros_animales}
                                onChange={handleChange}
                                className='p-1 rounded-2xl bg-slate-200 mb-4'
                            >
                                <option value=''>Seleccione una opción</option>
                                <option value="Sí">Sí</option>
                                <option value="No">No</option>
                            </select>
                            <div className='flex justify-center'>
                            <button className="bg-[#A5C454] w-80 text-lg text-white p-2 rounded-3xl mt-4">
          Registrar
        </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
              <div className="grid grid-cols-3 gap-20 p-52">
                <div className="bg-white h-72 w-64 shadow-lg rounded-xl">
                    <img className='h-48 w-64 rounded-tr-lg rounded-tl-lg' src="/src/assets/chispitas.JPG" alt="" />
                    <div className='mx-5'>
                    <h2 className='font-semibold text-xl mt-2'>Chibirica</h2>
                    <h2 className='text-lg mt-3'>Yamboro, Pitalito (H)</h2>
                    </div>
                </div>
                <div className="bg-white h-72 w-64 shadow-lg rounded-xl">
                <img className='h-48 w-64 rounded-tr-lg rounded-tl-lg' src="/src/assets/chispitas.JPG" alt="" />
                    <div className='mx-5'>
                    <h2 className='font-semibold text-xl mt-2'>Chibirica</h2>
                    <h2 className='text-lg mt-3'>Yamboro, Pitalito (H)</h2>
                </div>
                </div>
                <div className="bg-white h-72 w-64 shadow-lg rounded-xl">
                <img className='h-48 w-64 rounded-tr-lg rounded-tl-lg' src="/src/assets/chispitas.JPG" alt="" />
                    <div className='mx-5'>
                    <h2 className='font-semibold text-xl mt-2'>Chibirica</h2>
                    <h2 className='text-lg mt-3'>Yamboro, Pitalito (H)</h2>
                </div>
                </div>
                <div className="bg-white h-72 w-64 shadow-lg rounded-xl">
                <img className='h-48 w-64 rounded-tr-lg rounded-tl-lg' src="/src/assets/chispitas.JPG" alt="" />
                    <div className='mx-5'>
                    <h2 className='font-semibold text-xl mt-2'>Chibirica</h2>
                    <h2 className='text-lg mt-3'>Yamboro, Pitalito (H)</h2>
                </div>
                </div>
                <div className="bg-red-50 h-72 w-64 shadow-lg rounded-xl">
                <img className='h-48 w-64 rounded-tr-lg rounded-tl-lg' src="/src/assets/chispitas.JPG" alt="" />
                    <div className='mx-5'>
                    <h2 className='font-semibold text-xl mt-2'>Chibirica</h2>
                    <h2 className='text-lg mt-3'>Yamboro, Pitalito (H)</h2>
                    </div>
                </div>
                <div className="bg-red-50 h-72 w-64 shadow-lg rounded-xl"></div>
                <div className="bg-red-50 h-72 w-64 shadow-lg rounded-xl"></div>
                <div className="bg-red-50 h-72 w-64 shadow-lg rounded-xl"></div>
                <div className="bg-red-50 h-72 w-64 shadow-lg rounded-xl"></div>
                <div className="bg-red-50 h-72 w-64 shadow-lg rounded-xl"></div>
                <div className="bg-red-50 h-72 w-64 shadow-lg rounded-xl"></div>
            </div>

        </div>
    );
}

export default Dashboard;
