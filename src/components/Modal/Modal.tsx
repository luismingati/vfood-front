import close from '../../assets/close.svg'
import { ModalProps } from './ModalModel';
import { useModal } from './ModalViewModel';

const Modal: React.FC<ModalProps> = ({ title, children,  isOpen, onClose }) => {
  
  const { handleCloseModal, handleOverlayClick } = useModal(onClose);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="w-screen h-screen absolute top-0 left-0 flex items-center justify-center bg-[#00000040]" onClick={handleOverlayClick}>
      <div className="w-full max-w-[412px] flex flex-col bg-[#FDFDFD] px-5 py-6 rounded-[10px]">
        <div className="h-12 flex items-center justify-between mb-3">
          <div></div>
          <h2 className="font-bold text-lg">{title}</h2>
          <button onClick={handleCloseModal} ><img src={close} alt="" /></button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
