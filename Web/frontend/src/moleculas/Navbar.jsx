import React from 'react'
import v from '../../styles/variables'
import Icon from '../atomos/Icon'

function Navbar() {
  return (
    <header className={`fixed top-0 left-0 right-0 z-10 flex justify-between items-center px-10 h-14 bg-white shadow-md`}>
                <h1 className="text-3xl font-semibold text-[#FCA435]">PetLove</h1>
                <nav className="flex-grow flex justify-center space-x-24">
                    <a href="#" className="mx-2 text-lg hover:text-[#FCA435] text-[#FA67A7] cursor-pointer">Categorías</a>
                    <a href="#" className="mx-2 text-lg hover:text-[#FCA435] text-[#FA67A7] cursor-pointer">Razas</a>
                    <a href="#" className="mx-2 text-lg hover:text-[#FCA435] text-[#FA67A7] cursor-pointer">Requisitos de Adopcion</a>
                  {/*   <a href="#" className="mx-2 text-lg hover:text-[#FCA435] text-[#FA67A7] cursor-pointer">Soporte</a> */}
                </nav>
                <Icon className="hover:text-[#c5296c] text-[#FA67A7] cursor-pointer" icon={v.iconoPerfil} style={{ width: '30px', height: '30px' }}></Icon>
            </header>
  )
}

export default Navbar