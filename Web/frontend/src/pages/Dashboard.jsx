import React, { useEffect, useState } from 'react';
import v from '../../styles/variables';
import Icon from '../atomos/Icon';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import FormRegistro from '../organismos/FormRegistro';
import Navbar from '../moleculas/Navbar';

function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('register'); // 'register' or 'viewMore'
    const navigate = useNavigate();
    const [mensaje, setMensaje] = useState('');
    const [selectedMascota, setSelectedMascota] = useState(null);
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
    const [mascotas, setMascotas] = useState([]);

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
                const response = await axios.get('http://localhost:3000/mascota/listarM', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setMascotas(response.data);
            } catch (error) {
                console.error('Error al obtener las mascotas:', error);
            }
        };

        fetchCategorias();
        fetchRazas();
        fetchMascotas();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const openModal = (type, mascota = null) => {
        setModalType(type);
        setSelectedMascota(mascota);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                data.append(key, formData[key]);
            });

            const baseURL = 'http://localhost:3000/mascota/registrarM';
            await axios.post(baseURL, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

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
            <Navbar />
            <div className='flex justify-end mr-20 mt-20'>
                <button onClick={() => openModal('register')} className='bg-[#A5C454] w-44 text-lg text-white p-2 rounded-3xl'>
                    Registrar Mascota
                </button>
            </div>
            <FormRegistro modalOpen={modalOpen} closeModal={closeModal} formData={selectedMascota} />
            <div className="grid grid-cols-3 gap-20 p-52">
                {mascotas.map(mascota => (
                    <div key={mascota.id_mascotas} className="bg-white h-72 w-64 shadow-lg rounded-xl">
                        <img
                            className='h-48 w-64 rounded-tr-lg rounded-tl-lg'
                            src={`http://localhost:3000/uploads/${mascota.imagen}`}
                            alt={mascota.nombre_mascota}
                        />
                        <div className='mx-5'>
                            <h2 className='font-semibold text-xl mt-2'>{mascota.nombre_mascota}</h2>
                            <div className='flex justify-normal gap-10'>
                                <h2 className='text-lg mt-3'>{mascota.ciudad}</h2>
                                <h2 className='text-lg mt-3'><a href="#" onClick={() => openModal('viewMore', mascota)}>Ver más</a></h2>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
