import React from 'react'
import v from '../../styles/variables'
import Icon from '../atomos/Icon'

function Dashboard() {
    return (
        <div >
            <header className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center px-10 h-14 bg-white shadow-md">
                <h1 className="text-3xl font-semibold">PetLove</h1>
                <nav className="flex-grow flex justify-center space-x-24">
                    <a href="#" className="mx-2 text-lg hover:text-[#c5296c] text-[#FA67A7] cursor-pointer">Categorías</a>
                    <a href="#" className="mx-2 text-lg hover:text-[#c5296c] text-[#FA67A7] cursor-pointer">Razas</a>
                    <a href="#" className="mx-2 text-lg hover:text-[#c5296c] text-[#FA67A7] cursor-pointer">Requisitos de Adopcion</a>
                    <a href="#" className="mx-2 text-lg hover:text-[#c5296c] text-[#FA67A7] cursor-pointer">Soporte</a>
                </nav>
                <Icon className="hover:text-[#c5296c] text-[#FA67A7] cursor-pointer" icon={v.iconoPerfil}></Icon>
            </header>
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
    )
}

export default Dashboard