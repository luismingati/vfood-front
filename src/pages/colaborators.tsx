import React from "react";
import Searchbar from "../components/Searchbar/Searchbar";
import ColaboratorPageHeader from "../components/ColaboratorPageHeader/ColaboratorPageHeader";
import ColaboratorPageBody from "../components/ColaboratorPageBody/ColaboratorPageBody";
import { useState, useEffect } from "react";
import axios from "axios";

interface ColaboratorsProps {}

const Colaborators: React.FC<ColaboratorsProps> = () => {
  const [colaboratorsArray, setColaboratorsArray] = useState<
    ColaboratorCardModel[]
  >([]);
  const [valorDigitado, setValorDigitado] = useState("");
  const [value, setValue] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/colaborator/")
      .then((response) => {
        const colaboratorsData = response.data.map(
          (item: { id: number, name: string; area: string; grade: number }) => ({
            id: item.id,
            name: item.name,
            role: item.area,
            stars: item.grade,
          })
        );
        setColaboratorsArray(colaboratorsData);
      })
      .catch((error) => {
        console.error("Erro ao buscar colaboradores:", error);
      });
  }, [colaboratorsArray]);
  const alfabeto: string = "abcdefghijklmnopqrstuvwxyz";
  const handleSearch = (query: string) => {
    setValorDigitado(query);
  };
  const handleButtonClick = (valor: string) => {
    setValue(valor);
  };
  const data: ColaboratorCardModel[] = colaboratorsArray;
  const dataFilter = data.filter((item) =>
    item.name.toLowerCase().includes(valorDigitado.toLowerCase())
  );
  const rankingOrder: React.FC<ColaboratorsProps> = () => {
    colaboratorsArray.sort((a, b) => a.name.localeCompare(b.name));
    colaboratorsArray.sort((a, b) => (b.stars || 0) - (a.stars || 0));
    const elements: JSX.Element[] = [];
    let contador: number = 0;
    let achei: boolean = false;
    let repetido: boolean = false;
    for (
      let index = 5;
      index > 0 && contador != colaboratorsArray.length;
      index--
    ) {
      let states: number = 0;
      achei = false;
      if (
        (colaboratorsArray[contador].stars || 0) <= index &&
        (colaboratorsArray[contador].stars || 0) > index - 1 &&
        repetido == false &&
        dataFilter.includes(colaboratorsArray[contador])
      ) {
        elements.push(
          <ColaboratorPageBody contador={index} ColaboratorArray={dataFilter} />
        );
      }
      while (states < colaboratorsArray.length && achei == false) {
        if (
          (colaboratorsArray[states].stars || 0) <= index &&
          (colaboratorsArray[states].stars || 0) > index - 1
        ) {
          achei = true;
        }
        states++;
      }
      if (!achei) {
        continue;
      }
      if (colaboratorsArray[contador + 1] != undefined) {
        if (
          (colaboratorsArray[contador + 1].stars || 0) <= index &&
          (colaboratorsArray[contador + 1].stars || 0) > index - 1
        ) {
          if (dataFilter.includes(colaboratorsArray[contador])) {
            repetido = true;
            index++;
          } else if (!dataFilter.includes(colaboratorsArray[contador + 1])) {
            repetido = false;
            index++;
          } else if (dataFilter.includes(colaboratorsArray[contador + 1])) {
            repetido = false;
            index++;
          }
        } else {
          repetido = false;
        }
      }
      contador++;
    }
    return elements;
  };
  const alphabeticalOrder: React.FC<ColaboratorsProps> = () => {
    colaboratorsArray.sort((a, b) => a.name.localeCompare(b.name));
    const elements: JSX.Element[] = [];
    let contador: number = 0;
    let achei: boolean = false;
    let repetido: boolean = false;
    for (
      let index = 65;
      index < 91 && contador != colaboratorsArray.length;
      index++
    ) {
      let states: number = 0;
      achei = false;
      if (
        colaboratorsArray[contador].name[0].toLowerCase() ==
          alfabeto[index - 65] &&
        repetido == false &&
        dataFilter.includes(colaboratorsArray[contador])
      ) {
        elements.push(
          <ColaboratorPageBody contador={index} ColaboratorArray={dataFilter} />
        );
      }
      while (states < colaboratorsArray.length && achei == false) {
        if (
          colaboratorsArray[states].name[0].toLowerCase() ==
          alfabeto[index - 65]
        ) {
          achei = true;
        }
        states++;
      }
      if (!achei) {
        continue;
      }
      if (colaboratorsArray[contador + 1] != undefined) {
        if (
          colaboratorsArray[contador + 1].name[0].toLowerCase() ==
          alfabeto[index - 65]
        ) {
          if (dataFilter.includes(colaboratorsArray[contador])) {
            repetido = true;
            index--;
          } else if (!dataFilter.includes(colaboratorsArray[contador + 1])) {
            repetido = false;
            index--;
          } else if (dataFilter.includes(colaboratorsArray[contador + 1])) {
            repetido = false;
            index--;
          }
        } else {
          repetido = false;
        }
      }
      contador++;
    }
    return elements;
  };
  return (
    <div className="flex flex-1 h-full w-full bg-white py-9 px-12 flex-col rounded-[20px] overflow-y-scroll no-scrollbar">
      <Searchbar colaborators={colaboratorsArray} onSearch={handleSearch} />
      <ColaboratorPageHeader onclick={handleButtonClick} />
      {value == "Ranking" ? rankingOrder({}) : alphabeticalOrder({})}
    </div>
  );
};

export default Colaborators;
