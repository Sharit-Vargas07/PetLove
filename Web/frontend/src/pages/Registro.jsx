import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AccionesModal from '../moleculas/ModalAcciones.jsx';
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../NextIU/EyeFilledIcon.jsx";
import { EyeSlashFilledIcon } from "../NextIU/EyeSlashFilledIcon.jsx";
import Swal from 'sweetalert2';
import v from '../../styles/variables.jsx';

export const Registro = () => {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState('');
  const [modalAcciones, setModalAcciones] = useState(false);
  const [formData, setFormData] = useState({
    nombre_usuario: '',
    apellidos_usuario: '',
    correo_usuario: '',
    contrasena: '',
    telefono: '',
    rol: 'administrador',
  });
  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseURL = 'http://localhost:3000/usuario/registrarAdoptante';
      await axios.post(baseURL, formData);
      setMensaje('Usuario Registrado exitosamente');
      setModalAcciones(true);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Usuario Registrado Con Exito",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/');
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className='bg-cover bg-center h-screen flex justify-center' style={{ backgroundImage: `url(${v.Image1})`,  backgroundRepeat: 'no-repeat' }} >
    <div className='h-auto w-96 bg-white rounded-2xl shadow-lg m-10'>
      <form className='flex flex-col p-8' onSubmit={handleSubmit}>
        <h2 className='text-center text-3xl my-5'>Registro de Usuario</h2>
        <label className='text-xl'> Nombres:</label>
        <input
          type="text"
          className='p-1 rounded-2xl bg-slate-200'
          id='nombre_usuario'
          name='nombre_usuario'
          value={formData.nombre_usuario}
          onChange={handleChange}
        />
        <label className='text-xl'> Apellidos:</label>
        <input
          type="text"
          className='p-1 rounded-2xl bg-slate-200'
          id='apellidos_usuario'
          name='apellidos_usuario'
          value={formData.apellidos_usuario}
          onChange={handleChange}
        />
        <label className='text-xl'> Correo:</label>
        <input
          type="email"
          className='p-1 rounded-2xl bg-slate-200'
          id='correo_usuario'
          name='correo_usuario'
          value={formData.correo_usuario}
          onChange={handleChange}
        />
        <label className='text-xl'> Contraseña:</label>
        <div className='relative'>
          <input
            className='p-1 rounded-2xl bg-slate-200 w-full'
            id='contrasena'
            name='contrasena'
            value={formData.contrasena}
            onChange={handleChange}
            type={isVisible ? "text" : "password"}
          />
          <button
            type="button"
            onClick={toggleVisibility}
            className='absolute right-2 top-1/2 transform -translate-y-1/2'
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400" />
            )}
          </button>
        </div>
        <label className='text-xl'> Telefono:</label>
        <input
          type="text"
          className='p-1 rounded-2xl bg-slate-200'
          id='telefono'
          name='telefono'
          value={formData.telefono}
          onChange={handleChange}
        />
        <label className='text-xl'> Rol:</label>
        <select
          name='rol'
          id='rol'
          value={formData.rol}
          onChange={handleChange}
          className='p-1 rounded-2xl bg-slate-200'
        >
          <option value="adoptante">Adoptante</option>
        </select>
        <button className="bg-[#A5C454] text-lg text-white p-2 rounded-3xl mt-4">
          Registrarse
        </button>
      </form>
    </div>
    </div>
  );
};

export default Registro;
