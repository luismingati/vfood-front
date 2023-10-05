import {useState, createContext} from 'react';
import { useEffect } from 'react';
import ColaboratorCard from '../ColaboratorCard/ColaboratorCard';
const useSearchbarViewModel = (model: SearchforColaboratorModel) => {
    const [search, setSearch] = useState("");
    useEffect(() => {
        const localStorageSearch = localStorage.getItem("search");
        if (localStorageSearch) {
          setSearch(localStorageSearch);
          localStorage.removeItem("search");
        }
    }, []);
    const data : ColaboratorCardModel[] = model.colaborators;
    const dataFilter = data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    model.onSearch(search);
    return { search, dataFilter, setSearch};
}
export default useSearchbarViewModel;