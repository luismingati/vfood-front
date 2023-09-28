interface SearchforColaboratorModel { 
    colaborators : Array<ColaboratorCardModel>;
    onSearch: (query: string) => void;
}