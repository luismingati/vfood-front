interface ColaboratorCardModel { 
    name:string,  
    role:string, 
    stars?:number,
    avatar?:string,
    bg?:string
    onMonthChange?: (date: Date) => void;
}