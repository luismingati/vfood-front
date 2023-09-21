import chevron from '../../assets/chevron.svg'
import frame_blue from '../../assets/frame-blue.svg'
import frame_purple from '../../assets/frame-purple.svg'
import frame_green from '../../assets/frame-green.svg'
import frame_salmon from '../../assets/frame-salmon.svg'
import Modal from '../Modal/Modal'

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

  return (
    <>
      <div className="flex items-center w-full pt-3 gap-[10px] cursor-pointer px-[10px] border-t-[1px] border-[#D9D9D9]" >
          <img src={imageByGoal} alt={altText} className="w-12 h-8"/>
          <p className="text-[#312843] text-base font-normal"><span className="font-bold">{count} colaboradores</span> {message}</p>
          <img src={chevron} alt="" />
      </div>
      <Modal title='Colaboradores' isOpen={true} onClose={() => false} >
        <h1>teste</h1>
      </Modal>
      
    </>
  );
}

export default CardHighlight;
