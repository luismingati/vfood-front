import {IoPersonAddSharp} from 'react-icons/io5'
//import { useState } from 'react';
import Modal from '../Modal/Modal';
import { useColaboratorPageHeaderViewModel } from './ColaboratorPageHeaderViewModel';
const ColaboratorPageHeader = (props : ColaboratorPageHeaderProps) => {
const {openModal1, openModal2, modalIsOpen1, modalIsOpen2, closeModal1, closeModal2,
acenderBotao1, acenderBotao2, buttonColor1, buttonColor2, name, role, setName, setRole,
concluir, aplicar} = useColaboratorPageHeaderViewModel(props);
return (
    <>
        <div className='flex flex-row mt-[26px] font-poppins justify-between'>
            <Modal title='Adicionar Colaborador' isOpen={modalIsOpen1} onClose={closeModal1} children = 
            {
                <div className='flex flex-col justify-center gap-[24px]'>
                    <div className='flex flex-col gap-[12px]'>
                        <div className='w-[352px] h-[63px] border border-[#A3A3A3] rounded-[10px]'>
                            <input value={name} onChange = {(e) => setName(e.target.value)} type="text" className='pl-[12px] w-full h-full bg-transparent placeholder:text-[14px] placeholder-[#A3A3A3] outline-none' placeholder='Nome do colaborador'/>
                        </div>
                        <div className='w-[352px] h-[63px] border border-[#A3A3A3] rounded-[10px] '>
                            <input value={role} onChange = {(e) => setRole(e.target.value)} type="text" className='pl-[12px] w-full h-full bg-transparent outline-none placeholder:text-[14px]' placeholder='Área'/>
                        </div>
                    </div>
                    <button className='rounded-[10px]' onClick={concluir}>
                    <div className='w-[352px] h-[60px] rounded-[10px] bg-[#952323] pt-[18px]'>
                        <p className='text-[#FDFDFD] text-[16px] font-semibold'>Concluir</p>
                    </div>
                    </button>
                </div>
            }/>                
            <Modal title='Ordenar' isOpen={modalIsOpen2} onClose={closeModal2} children = 
             {
                <div className='flex flex-col justify-center gap-[48px]'> 
                    <div className='flex flex-col gap-[20px]'>
                        <h1 className='text-[#312843] font-bold text-[16px]'>Mostrar colaboradores por:</h1>
                        <div className='flex flex-col gap-[3px]'>
                            <button onClick={() => acenderBotao1()} className= {'pl-[10px] h-[44px] rounded-[10px] ' + buttonColor1}>
                                <p className= 'text-[16px] font-normal text-[#312843] text-left'>Ranking</p>
                            </button>
                            <button onClick={() => acenderBotao2()} className= {'pl-[10px] h-[44px] rounded-[10px] ' + buttonColor2}>
                                <p className= 'text-[16px] font-normal text-[#312843] text-left'>Ordem alfabética</p>
                            </button>
                        </div>
                    </div>
                    <button className= {'rounded-[10px]'} value={
                            buttonColor1 == 'bg-[#95232340]' ? 'Ranking' : 'Ordem alfabética'
                        } onClick={() => aplicar('aplicar')} id = 'aplicar'>
                        <div className='w-[352px] h-[60px] rounded-[10px] bg-[#952323] pt-[18px]'>
                            <p className='text-[#FDFDFD] text-[16px] font-semibold'>Aplicar</p>
                        </div>
                    </button>
                </div>
            }/>
            <div className='flex flex-row gap-[12px]'>
                    <p className=' text-[#312843] text-[32px] font-bold'>Colaboradores</p>
                <button className=' bg-[#952323] border rounded-full w-[48px] h-[48px]' onClick={() => openModal1()}>
                    <p className='text-white text-[21.33px] ml-[12px] h-[22px]'><IoPersonAddSharp/></p>
                </button>
            </div>
            <button className=' rounded-[10px]' onClick={() => openModal2()}>
                <div className='bg-[#952323] w-[136px] h-[48px] rounded-[10px] gap-[12px] flex flex-row'>
                    <div className='ml-[12px] mt-[18px] gap-[3px] '>
                        <div className='border border-[#FDFDFD] w-[18px] mb-[3px]'>

                        </div >
                        <div className='border border-[#FDFDFD] w-[12px] mb-[3px]'>

                        </div>
                        <div className='border border-[#FDFDFD] w-[6px]'>

                        </div>
                    </div>
                    <p className='text-[16px] font-bold text-[#FDFDFD] mt-[12px]'>Ordenar</p>
                </div>
            </button>
        </div>
    </>
    )
}
export default ColaboratorPageHeader;