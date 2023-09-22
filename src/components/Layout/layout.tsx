import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-[#952323] w-screen h-screen py-16 pr-[60px]">
      <div className="flex h-full scroll">

        <aside className="w-56 h-full flex flex-col items-center gap-[164px] px-3 font-poppins">
          <h1 className="text-white text-2xl font-black uppercase">v-foods</h1>
          <div className="flex flex-col w-full">
          <NavLink to="/" >
            {({ isActive }) => (
              <button className={isActive ? " bg-white px-3 py-2 w-full text-[#952323] text-base font-bold rounded-[10px]" : "text-white px-3 py-2 w-full text-base font-bold"}>Início</button>
            )}
          </NavLink>
            <NavLink to="/colaborators">
            {({ isActive }) => (
              <button className={isActive ? " bg-white px-3 py-2 w-full text-[#952323] text-base font-bold rounded-[10px]" : "text-white px-3 py-2 w-full text-base font-bold"}>Colaboradores</button>
            )}
            </NavLink>
          </div>
          <div>
            <h1>Configurações</h1>
            <h1>Sair</h1>
          </div>
        </aside>

        <div className="w-full h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;