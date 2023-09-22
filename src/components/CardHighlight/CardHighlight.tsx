import chevron from '../../assets/chevron.svg';
import profile from '../../assets/perfil.svg';
import Modal from '../Modal/Modal';
import NoteCard from '../NoteCard/NoteCard';
import { CardHighlightProps } from './CardHighlightModel';
import { useCardHighlight } from './CardHighlightViewModel';

const CardHighlight: React.FC<CardHighlightProps> = (props: CardHighlightProps) => {
  const {closeModal, imageByGoal, modalIsOpen, openModal} = useCardHighlight(props);
  
  return (
    <>
      <div className="flex items-center w-full pt-3 gap-[10px] cursor-pointer px-[10px] border-t-[1px] border-[#D9D9D9]" onClick={openModal}>
            <img src={imageByGoal} alt="" className="w-12 h-8"/>

          <p className="text-[#312843] text-base font-normal"><span className="font-bold">{props.count} colaboradores</span> {props.message}</p>
          <img src={chevron} alt="" />
      </div>
      <Modal title='Colaboradores' isOpen={modalIsOpen} onClose={closeModal}>
      <div className='flex flex-col gap-3 h-full max-h-96 overflow-y-auto no-scrollbar'>
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
        </div>
      </Modal>
    </>
  );
}

export default CardHighlight;