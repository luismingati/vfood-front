import { NavLink, Outlet } from "react-router-dom";
import Group from "./groupSVG";
import Home from "./homeSVG";
import settings from '../../assets/settings.svg'
import logout from '../../assets/logout.svg'

const Layout = () => {
  return (
    <div className="bg-[#952323] w-screen h-screen py-16 pr-[60px]">
      <div className="flex h-full ">

        <aside className="w-56 h-full flex flex-col items-center gap-[164px] px-3 font-poppins">
          <h1 className="text-white text-2xl font-black uppercase">v-foods</h1>
          <div className="flex flex-col w-full">
            <NavLink to="/" >
              {({ isActive }) => (
                <button className={isActive ? "bg-white px-3 py-2 w-full text-[#952323] text-base font-bold rounded-[10px] flex items-center gap-[10px]" : "flex items-center gap-[10px] text-white px-3 py-2 w-full text-base font-bold"}>
                  <Home />
                  <p>Início</p>
                </button>
              )}
            </NavLink>
              <NavLink to="/colaborators">
              {({ isActive }) => (
                <button className={isActive ? "bg-white px-3 py-2 w-full text-[#952323] text-base font-bold rounded-[10px] flex items-center gap-[10px]" : "flex items-center gap-[10px] text-white px-3 py-2 w-full text-base font-bold"}>
                  <Group />
                  <p>Colaboradores</p>
                </button>
              )}
              </NavLink>
          </div>
          <div className="flex flex-col w-full">
            <div>
              <button className="flex items-center gap-[10px] text-white px-3 py-2 w-full text-base font-bold cursor-default">
                <img src={settings} alt="" />
                <p>Configurações</p>
              </button>
              <button className="flex items-center gap-[10px] text-white px-3 py-2 w-full text-base font-bold cursor-default">
                <img src={logout} alt="" />
                <p>Sair</p>
              </button>
            </div>
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