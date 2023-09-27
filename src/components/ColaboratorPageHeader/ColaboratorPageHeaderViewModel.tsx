import { useState } from 'react';
export const useColaboratorPageHeaderViewModel = (model : ColaboratorPageHeaderProps) => {
    const [modalIsOpen1, setIsOpen1] = useState(false);
    const [modalIsOpen2, setIsOpen2] = useState(false);
    const [buttonColor1, setButtonColor1] = useState('bg-[#FDFDFD]')
    const [buttonColor2, setButtonColor2] = useState('bg-[#FDFDFD]')
    const openModal1 = () => {
        setIsOpen1(true);
    };
    const openModal2 = () => {
        setIsOpen2(true);
    };
    const closeModal1 = () => {
        setIsOpen1(false);
    };
    const closeModal2 = () => {
        setIsOpen2(false);
    };
    const acenderBotao1 = () => {
        setButtonColor1('bg-[#95232340]');
        setButtonColor2('bg-[#FDFDFD]');
    };
    const acenderBotao2 = () => {
        setButtonColor1('bg-[#FDFDFD]');
        setButtonColor2('bg-[#95232340]');
    };
    return { modalIsOpen1, modalIsOpen2, openModal1, openModal2, 
    closeModal1, closeModal2, buttonColor1, buttonColor2, acenderBotao1, acenderBotao2};
}