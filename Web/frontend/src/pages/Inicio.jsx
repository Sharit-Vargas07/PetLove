import React from 'react'
import v from '../../styles/variables'

function Inicio() {
  return (
    <div className='bg-cover bg-center h-screen' style={{ backgroundImage: `url(${v.Image1})`,  backgroundRepeat: 'no-repeat' }}>
      <div className='flex justify-center p-5'>
        <img className='h-20 w-24' src="/src/assets/logo.png" alt="" />
        <div className="ml-auto space-x-4 pt-3">
          <button className="bg-[#FA67A7] shadow-lg text-lg text-white p-2 rounded-lg">Regístrate</button>
          <button className="bg-[#A5C454] shadow-lg text-lg text-white p-2 rounded-lg">Iniciar Sesión</button>
        </div>
      </div>
      <div>
        <h1 className='text-center items-center text-6xl m-40 font-semibold'>Bienvenido a PetLove</h1>
      </div>
    </div>
  )
}

export default Inicio