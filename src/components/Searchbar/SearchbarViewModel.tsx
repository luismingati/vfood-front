import {useState} from 'react';
const useSearchbarViewModel = (model: SearchforColaboratorModel) => {
    const [search, setSearch] = useState('');
    const data : SearchforColaboratorModel[] = [model];
    const dataFilter = data.filter((item) => item.name?.toLowerCase().includes(search.toLowerCase()));
    return {
        search, dataFilter, setSearch
    }
}

export default useSearchbarViewModel;