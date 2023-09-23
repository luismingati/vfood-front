const Searchbar = () => {
    return(
    <div className="flex w-full justify-center mt-24">
        <div className="w-5/6 flex pl-7 rounded-xl gap-2.5 h-12 bg-searchbarcolor">
            <div className="mt-3.5">
                <svg className="w-6 h-6 text-searchbarBlue" fill="none">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="" id="default-search" className=" w-full outline-none bg-transparent placeholder-searchbarBlue placeholder:font-normal placeholder:text-base" placeholder="Buscar colaboradores"/>
        </div>
    </div>
    )
}

export default Searchbar;