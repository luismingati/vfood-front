import { useState } from 'react';
import frame_blue from '../../assets/frame-blue.svg';
import frame_purple from '../../assets/frame-purple.svg';
import frame_green from '../../assets/frame-green.svg';
import frame_salmon from '../../assets/frame-salmon.svg';
import { GoalsTypes, CardHighlightProps } from './CardHighlightModel';

export const useCardHighlight = (props: CardHighlightProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const imageByGoal = (() => {
    switch(props.metaType) {
      case GoalsTypes.GOAL:
        return frame_purple;
      case GoalsTypes.SUPERGOAL:
        return frame_green;
      case GoalsTypes.CHALLENGE:
        return frame_blue;
      case GoalsTypes.NOT_REACHED:
        return frame_salmon;
    }
  })();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return {
    modalIsOpen,
    imageByGoal,
    openModal,
    closeModal
  };
}
