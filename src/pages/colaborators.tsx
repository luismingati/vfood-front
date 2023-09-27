import React from "react";
import IndicatorsSummary from "../components/IndicatorsSummary/IndicatorsSummary";
import Searchbar from "../components/Searchbar/Searchbar";
import ColaboratorPageHeader from "../components/ColaboratorPageHeader/ColaboratorPageHeader";
import ColaboratorPageBody from "../components/ColaboratorPageBody/ColaboratorPageBody";
import {useState} from 'react';
const colaboratorsArray : ColaboratorCardModel[] = [
  {
    name: "Thales",
    role: "Dev",
    stars: 5
  },
  {
    name: "Luis Felipe",
    role: "Dev",
    stars: 5
  },
  {
    name: "Luis Otavio",
    role: "Dev",
    stars: 5
  },
  {
    name: "Lucas",
    role: "Dev",
    stars: 5
  },
  {
    name: "Antonio",
    role: "Dev",
    stars: 5
  },
  {
    name: "Bruno",
    role: "Dev",
    stars: 4.1
  },
  {
    name: "Ana Clara",
    role: "Dev",
    stars: 4.5
  },
  {
    name: "Ana Beatriz",
    role: "Dev",
    stars: 3.2
  },
  {
    name: "Carlos Eduardo",
    role: "Dev",
    stars: 2.5
  },
  {
    name: 'Ze',
    role: 'Dev',
    stars: 1.5
  },
  {
    name: 'Pedro',
    role: 'Dev',
    stars: 0.5
  },
  {
    name: 'Joao',
    role: 'Dev',
    stars: 0.2
  },
  {
    name: 'Maria',
    role: 'Dev',
    stars: 4
  }
]
const indicatorsArray = [
  {
    name: "Converter 20 novos clientes",
    weight: 0.4,
    progress: 18,
    unit: "Número",
    goal: 20,
    superGoal: 30,
    challenge: 40,
  },
  
  {
    name: "Converter 40 novos clientes",
    weight: 0.4,
    progress: 22,
    unit: "Financeiro",
    goal: 20,
    superGoal: 30,
    challenge: 40,
  },
  
  {
    name: "Converter 30 novos clientes",
    weight: 0.4,
    progress: 33,
    unit: "Percentual",
    goal: 20,
    superGoal: 30,
    challenge: 40,
  },
  
  {
    name: "Converter 10 novos clientes",
    weight: 0.4,
    progress: 44,
    unit: "Número",
    goal: 20,
    superGoal: 30,
    challenge: 40,
  },
];
interface ColaboratorsProps {}
const Colaborators: React.FC<ColaboratorsProps> = () => {
  const [valorDigitado, setValorDigitado] = useState('');
  const [value, setValue] = useState('');
  const alfabeto : string = "abcdefghijklmnopqrstuvwxyz";
  const handleSearch = (query: string) => {
    setValorDigitado(query);
  };
  const handleButtonClick = (valor:string) => {
    setValue(valor);
  };
  const data : ColaboratorCardModel[] = colaboratorsArray;
  const dataFilter = data.filter((item) => item.name.toLowerCase().includes(valorDigitado.toLowerCase()));
  const rankingOrder : React.FC<ColaboratorsProps> = () => {
    colaboratorsArray.sort((a, b) => a.name.localeCompare(b.name));
    colaboratorsArray.sort((a, b) => (b.stars || 0) - (a.stars || 0));
    const elements: JSX.Element[] = [];
    let contador : number = 0;
    let achei : boolean = false;
    let repetido : boolean = false;
    for (let index = 5; index > 0 && contador != colaboratorsArray.length; index--){
      let states : number = 0;
      achei = false;
      if((colaboratorsArray[contador].stars || 0) <= index && (colaboratorsArray[contador].stars || 0) > index - 1 && repetido == false && dataFilter.includes(colaboratorsArray[contador])){
        elements.push(
          <ColaboratorPageBody contador={index} ColaboratorArray={dataFilter}/>
        );
      }
      while(states < colaboratorsArray.length && achei == false){
        if((colaboratorsArray[states].stars || 0) <= index && (colaboratorsArray[states].stars || 0) > index - 1){
          achei = true;
        }
        states++;
      }
      if(!achei){
        continue;
      }
      if(colaboratorsArray[contador + 1] != undefined){
        if((colaboratorsArray[contador+1].stars || 0) <= index && (colaboratorsArray[contador+1].stars || 0) > index - 1){
          repetido = true;
          index++;
        }
        else{
          repetido = false;
        }
      }
      contador++;
    }
    return elements;
  }
  const alphabeticalOrder : React.FC<ColaboratorsProps> = () => {
    colaboratorsArray.sort((a, b) => a.name.localeCompare(b.name));
    const elements: JSX.Element[] = [];
    let contador : number = 0;
    let achei : boolean = false;
    let repetido : boolean = false;
    for (let index = 65; index < 91 && contador != colaboratorsArray.length; index++) {
      let states : number = 0;
      achei = false;
      if(colaboratorsArray[contador].name[0].toLowerCase() == alfabeto[index - 65] && repetido == false && dataFilter.includes(colaboratorsArray[contador])){
        elements.push(
          <ColaboratorPageBody contador={index} ColaboratorArray={dataFilter}/>
        );
      }
      while(states < colaboratorsArray.length && achei == false){
        console.log(states);
        if(colaboratorsArray[states].name[0].toLowerCase() == alfabeto[index - 65]){
          achei = true;
        }
        states++;
      }
      if(!achei){
        continue;
      }
      if(colaboratorsArray[contador + 1] != undefined){
        if(colaboratorsArray[contador + 1].name[0].toLowerCase() == alfabeto[index - 65]){
          repetido = true;
          index--;
        }
        else{
          repetido = false;
        }
      }
      contador++;
    }
    return elements;
  }
  return (
    <div className="flex flex-1 h-full w-full bg-white py-9 px-12 flex-col rounded-[20px] overflow-y-scroll">
      <Searchbar colaborators={colaboratorsArray} onSearch={handleSearch}/>
      <ColaboratorPageHeader onclick={handleButtonClick}/>
      {value == 'Ranking' ? rankingOrder({}) : alphabeticalOrder({})}
      {/* <IndicatorsSummary thisMonth={true} indicatorsArray={indicatorsArray} /> */}
    </div>
  );
};

export default Colaborators;
