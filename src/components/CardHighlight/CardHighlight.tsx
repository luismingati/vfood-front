import chevron from '../../assets/chevron.svg'
import frame_blue from '../../assets/frame-blue.svg'
import frame_purple from '../../assets/frame-purple.svg'
import frame_green from '../../assets/frame-green.svg'
import frame_salmon from '../../assets/frame-salmon.svg'
import profile from '../../assets/perfil.svg'

import Modal from '../Modal/Modal'
import { useState } from 'react'
import NoteCard from '../NoteCard/NoteCard'

export enum GoalsTypes {
  GOAL = "GOAL",
  SUPERGOAL = "SUPERGOAL",
  CHALLENGE = "CHALLENGE",
  NOT_REACHED = "NOT_REACHED",
}

type CardHighlightProps = {
  metaType: GoalsTypes;
  altText?: string;
  count: number;
  message: string;
}

const CardHighlight: React.FC<CardHighlightProps> = ({ metaType, altText, count, message }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false); 

  let imageByGoal;
  if(metaType === GoalsTypes.GOAL) {
    imageByGoal = frame_purple;
  } else if (metaType === GoalsTypes.SUPERGOAL) {
    imageByGoal = frame_green;
  } else if (metaType === GoalsTypes.CHALLENGE) {
    imageByGoal = frame_blue;
  } else if (metaType === GoalsTypes.NOT_REACHED) {
    imageByGoal = frame_salmon;
  }
  const openModal = () => {
      setModalIsOpen(true);
  };

  const closeModal = () => {
      setModalIsOpen(false);
  };
  
  return (
    <>
      <div className="flex items-center w-full pt-3 gap-[10px] cursor-pointer px-[10px] border-t-[1px] border-[#D9D9D9]" onClick={openModal}>
          <img src={imageByGoal} alt={altText} className="w-12 h-8"/>
          <p className="text-[#312843] text-base font-normal"><span className="font-bold">{count} colaboradores</span> {message}</p>
          <img src={chevron} alt="" />
      </div>
      <Modal title='Colaboradores' isOpen={modalIsOpen} onClose={closeModal} >
        <div className='flex flex-col gap-3'>
          <div className='flex items-center justify-between py-[10px] px-4'>
            <div className='flex  gap-3'>
              <img src={profile} alt="" />
              <div className=''>
                <p className='text-sm'>Marketing</p>
                <h3 className='font-bold text-lg'>Alice Martins</h3>
              </div>
            </div>
            <NoteCard note={10} long={false}/>
          </div>

          <div className='flex items-center justify-between py-[10px] px-4'>
            <div className='flex  gap-3'>
              <img src={profile} alt="" />
              <div className=''>
                <p className='text-sm'>Marketing</p>
                <h3 className='font-bold text-lg'>Alice Martins</h3>
              </div>
            </div>
            <NoteCard note={8} long={false}/>
          </div>

          <div className='flex items-center justify-between py-[10px] px-4'>
            <div className='flex  gap-3'>
              <img src={profile} alt="" />
              <div className=''>
                <p className='text-sm'>Marketing</p>
                <h3 className='font-bold text-lg'>Alice Martins</h3>
              </div>
            </div>
            <NoteCard note={6} long={false}/>
          </div>

          <div className='flex items-center justify-between py-[10px] px-4'>
            <div className='flex  gap-3'>
              <img src={profile} alt="" />
              <div className=''>
                <p className='text-sm'>Marketing</p>
                <h3 className='font-bold text-lg'>Alice Martins</h3>
              </div>
            </div>
            <NoteCard note={2} long={false}/>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CardHighlight;
