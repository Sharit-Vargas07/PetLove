import React from 'react'

function FormRegistro() {
  return (
    <div className='h-auto w-96 bg-white rounded-2xl shadow-lg'>
        <form action="" className='flex flex-col p-8'>
            <h2 className='text-center text-3xl my-5'>Regitro de Usuario</h2>
            <label className='text-xl'> Nombres:</label>
            <input type="text" className='p-1 rounded-2xl bg-slate-200'/>
            <label className='text-xl'> Apellidos:</label>
            <input type="text"  className='p-1 rounded-2xl bg-slate-200'/>
            <label className='text-xl'> Correo:</label>
            <input type="email"  className='p-1 rounded-2xl bg-slate-200'/>
            <label className='text-xl'> Contraseña:</label>
            <input type="text"  className='p-1 rounded-2xl bg-slate-200'/>
            <label className='text-xl'> Telefono:</label>
            <input type="number"  className='p-1 rounded-2xl bg-slate-200' />
            <label className='text-xl'> Rol:</label>
            <select name="seleccione" className='p-1 rounded-2xl mb-5 bg-slate-200' id="">
                <option value="">Administrador</option>
                <option value="">Adoptante</option>
            </select>
            <button className="bg-[#A5C454] text-lg text-white p-2 rounded-3xl ">Registrarse</button>
        </form>
    </div>
  )
}

export default FormRegistro