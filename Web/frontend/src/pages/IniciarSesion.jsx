import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../NextIU/EyeFilledIcon.jsx";
import { EyeSlashFilledIcon } from "../NextIU/EyeSlashFilledIcon.jsx";
import AccionesModal from '../moleculas/ModalAcciones.jsx'
import v from '../../styles/variables'
import Swal from 'sweetalert2';

export const InicioSesion = () => {
  const [mensaje, setMensaje] = useState('');
  const [modalAcciones, setModalAcciones] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const correo = useRef(null);
  const contrasena = useRef(null);
  const navigate = useNavigate();

  const baseURL = "http://localhost:3000/validacion/validar";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const correoValue = correo.current.value;
      const contrasenaValue = contrasena.current.value;

      if (!correoValue || !contrasenaValue) {
        setMensaje('Los campos son obligatorios');
        setModalAcciones(true);
        return;
      }

      const data = { correo_usuario: correoValue, contrasena: contrasenaValue };

      const response = await axios.post(baseURL, data);

      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user[0]));
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Bienvenido",
          showConfirmButton: false,
          timer: 1500
        });

        const userRol = user[0]?.rol;

        if (userRol === 'adoptante') {
          setMensaje('Bienvenido adoptante');
          setModalAcciones(true);
          navigate('/');
        } else if (userRol === 'administrador') {
          setMensaje('Bienvenido Admin');
          setModalAcciones(true);
          setModalOpen(false);
          navigate('/Dashboard');
        }
      } else {
        setMensaje('Credenciales incorrectas');
        setModalAcciones(true);
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Datos Incorrectos",
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      console.error('Error del servidor:', error);
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Error del servidor",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className='bg-cover bg-center h-screen flex justify-center' style={{ backgroundImage: `url(${v.Image1})`, backgroundRepeat: 'no-repeat' }}>
      <div className='h-80 w-96 bg-white rounded-2xl shadow-lg m-40'>
        <form className='flex flex-col p-8' onSubmit={handleSubmit}>
          <h2 className='text-center text-3xl my-5'>Inicio de Sesion</h2>
          <label className='text-xl'>Correo:</label>
          <input
            type="email"
            className='p-1 rounded-2xl bg-slate-200'
            ref={correo}
            name="correo_usuario"
            id="correo_usuario"
          />
          <label className='text-xl'>Contraseña:</label>
          <div className='relative'>
            <input
              className='p-1 rounded-2xl bg-slate-200 w-full'
              ref={contrasena}
              name="contrasena"
              id="contrasena"
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
          <button className="bg-[#A5C454] text-lg text-white p-2 rounded-3xl mt-5" type="submit">
            Iniciar Sesion
          </button>
        </form>
      </div>
    </div>
  );
};

export default InicioSesion;
