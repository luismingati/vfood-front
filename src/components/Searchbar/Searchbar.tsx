import useSearchbarViewModel from "./SearchbarViewModel";
const Searchbar = (props: SearchforColaboratorModel) => {
  const viewModel = useSearchbarViewModel(props);
  return (
    <>
      <div className="flex w-full justify-center font-poppins">
        <div className="w-full flex pl-7 rounded-xl gap-2.5 h-12 bg-searchbarcolor">
          <div className="mt-3.5">
            <svg className="w-6 h-6 text-searchbarBlue" fill="none">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={viewModel.search}
            onChange={(e) => viewModel.setSearch(e.target.value)}
            id="default-search"
            className=" w-full outline-none bg-transparent placeholder-searchbarBlue placeholder:font-normal placeholder:text-base"
            placeholder="Buscar colaboradores"
          />
        </div>
      </div>
    </>
  );
};

export default Searchbar;
