type ModalProps = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ title, children,  isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="w-screen h-screen absolute top-0 left-0 flex items-center justify-center bg-[#00000040]">
      <div className="w-40 h-40 bg-red-400">
        <div className="modal-content">
          <h2>{title}</h2>
          <button onClick={onClose}>Fechar Modal</button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
