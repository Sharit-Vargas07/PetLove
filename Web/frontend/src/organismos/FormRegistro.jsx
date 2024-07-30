import React, { useState, useEffect } from "react";
import axios from "axios";
import Icon from "../atomos/Icon";
import v from "../../styles/variables";
import Swal from "sweetalert2";

function FormRegistro({ modalOpen, closeModal }) {
    const [formData, setFormData] = useState({
        nombre_mascota: '',
        ciudad: '',
        fk_id_categoria: '',
        fk_id_raza: '',
        genero_mascotas: '',
        edad_mascota: '',
        tamano: '',
        color_mascota: '',
        esterilizacion: '',
        vacunas: '',
        desparacitacion: '',
        fecha_ult_desparacitacion: '',
        discapacidad: '',
        descripcion_discapacidad: '',
        compatibilidad_ninos: '',
        compatibilidad_otros_animales: '',
        imagen: null,
    });

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            imagen: e.target.files[0],
        });
    };

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

        fetchCategorias();
        fetchRazas();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.nombre_mascota) {
            Swal.fire({
                position: "top-center",
                icon: "error",
                title: "El nombre de la mascota no puede estar vacío",
                showConfirmButton: true,
            });
            return;
        }
        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                data.append(key, formData[key]);
            });

            await axios.post('http://localhost:3000/mascota/registrarM', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Mascota Registrada Con Exito",
                showConfirmButton: false,
                timer: 1500,
            });
            closeModal();
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

    if (!modalOpen) return null;

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50" onClick={closeModal}>
            <div className="bg-white mt-10 p-8 rounded-lg shadow-lg max-h-[85%] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <button onClick={closeModal}>
                    <Icon className="hover:text-[#c5296c] text-[#FA67A7] cursor-pointer" icon={v.iconoCerrar} style={{ width: '20px', height: '20px' }}></Icon>
                </button>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                    <h2 className='text-center text-3xl mb-8'>Registro de Mascota</h2>
                    <label className='text-xl mb-2'> Imagen de la Mascota:</label>
                    <input
                        type="file"
                        accept="image/*"
                        className='p-1 rounded-2xl bg-slate-200 mb-4'
                        id='imagen'
                        name='imagen'
                        onChange={handleFileChange}
                    />
                    <label className='text-xl mb-2'> Nombre:</label>
                    <input
                        type="text"
                        className='mb-4 p-1 rounded-2xl bg-slate-200'
                        id='nombre_mascota'
                        name='nombre_mascota'
                        value={formData.nombre_mascota}
                        onChange={handleChange}
                    />
                    <label className='text-xl mb-2'>Ciudad:</label>
                    <input
                        type="text"
                        className='p-1 rounded-2xl bg-slate-200 mb-4'
                        id='ciudad'
                        name='ciudad'
                        value={formData.ciudad}
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
                        name='tamano'
                        id='tamano'
                        value={formData.tamano}
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
                    <label className='text-xl mb-2'> Desparacitación:</label>
                    <select
                        name='desparacitacion'
                        id='desparacitacion'
                        value={formData.desparacitacion}
                        onChange={handleChange}
                        className='p-1 rounded-2xl bg-slate-200 mb-4'
                    >
                        <option value=''>Seleccione una opción</option>
                        <option value="Sí">Sí</option>
                        <option value="No">No</option>
                    </select>
                    <label className='text-xl mb-2'> Fecha de Última Desparacitación:</label>
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
                    {formData.discapacidad === "Sí" && (
                        <>
                            <label className='text-xl mb-2'> Descripción de la Discapacidad:</label>
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
                    <label className='text-xl mb-2'> Compatibilidad con Niños:</label>
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
                    <label className='text-xl mb-2'> Compatibilidad con Otros Animales:</label>
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
                    <button type='submit' className='bg-[#FA67A7] hover:bg-[#c5296c] text-white py-2 px-4 rounded-xl'>
                        Registrar Mascota
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FormRegistro;
