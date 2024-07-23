import React from 'react'
import v from '../../styles/variables'
import { Link } from 'react-router-dom'

function Inicio() {
  return (
    <div className='bg-cover bg-center h-screen' style={{ backgroundImage: `url(${v.Image1})`,  backgroundRepeat: 'no-repeat' }}>
      <div className='flex justify-center p-5'>
        <img className='h-20 w-20' src={v.logo} alt="" />
        <div className="ml-auto space-x-4 pt-3">
        <Link to='/registro'>
          <button className="bg-[#FA67A7] shadow-lg text-lg text-white p-2 rounded-lg" >Regístrate</button>
          </Link>
          <Link to='/inicioS'>
          <button className="bg-[#A5C454] shadow-lg text-lg text-white p-2 rounded-lg">Iniciar Sesión</button>
          </Link>
        </div>
      </div>
      <div>
        <h1 className='text-center items-center text-6xl m-40 font-semibold'>Bienvenido a PetLove</h1>
      </div>
    </div>
  )
}

export default Inicio