import { useState } from "react";
import axios from "axios";
export const useColaboratorPageHeaderViewModel = (
  model: ColaboratorPageHeaderProps
) => {
  const [modalIsOpen1, setIsOpen1] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [buttonColor1, setButtonColor1] = useState("bg-[#FDFDFD]");
  const [buttonColor2, setButtonColor2] = useState("bg-[#FDFDFD]");
  const [name, setName] = useState<string>(model.name || "");
  const [role, setRole] = useState<string>(model.role || "");
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
    setButtonColor1("bg-[#95232340]");
    setButtonColor2("bg-[#FDFDFD]");
  };
  const acenderBotao2 = () => {
    setButtonColor1("bg-[#FDFDFD]");
    setButtonColor2("bg-[#95232340]");
  };
  const concluir = () => {
    const novoColaborador = {
      name: name,
      area: role,
      grade: 999,
    };
    axios
      .post("http://localhost:3000/colaborator", novoColaborador)
      .then((response) => {
        closeModal1();
        setName("");
        setRole("");
      })
      .catch((error) => {
        console.error("Erro ao buscar colaboradores:", error);
      });
    closeModal1();
    setName("");
    setRole("");
    model.updateArray();
  };
  const aplicar = (parametro: string) => {
    const abacate = document.getElementById(parametro) as HTMLButtonElement;
    model.onclick(abacate.value);
    closeModal2();
  };
  return {
    modalIsOpen1,
    modalIsOpen2,
    openModal1,
    openModal2,
    closeModal1,
    closeModal2,
    buttonColor1,
    buttonColor2,
    acenderBotao1,
    acenderBotao2,
    name,
    role,
    setName,
    setRole,
    concluir,
    aplicar,
  };
};
