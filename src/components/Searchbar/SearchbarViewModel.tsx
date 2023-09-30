import {useState} from 'react';
//import ColaboratorCard from '../ColaboratorCard/ColaboratorCard';
const useSearchbarViewModel = (model: SearchforColaboratorModel) => {
    const [search, setSearch] = useState('');
    const data : ColaboratorCardModel[] = model.colaborators;
    const dataFilter = data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    model.onSearch(search);
    return { search, dataFilter, setSearch};
}
export default useSearchbarViewModel;