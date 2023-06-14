import '../styles/headersec.css'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import wheel from "../assets/assetsMap/icons/wheel.png"

function HeaderSectur() {

  const [BurgerActive, setBurgerActive] = useState(false);

  return (
    <div>
      <div className='lg:flex hidden bg-[#e7d2ac] w-full'>
        <div className='flex w-5/12'>
          <div className='ml-8 py-3 text-[#333333] font-medium'>
            <p className='xl:text-3xl text-xl font-medium PageTitle1'>SECRETARÍA DE TURISMO</p>
          </div>
        </div>

        <div className='w-full mx-3'>
          <div>
            <nav>
              <ul className='flex justify-end PageTitle3'>
                <li><NavLink to="/" className={({ isActive }) => { return isActive ? "activado" : ""; }}><div className="menu-options">Inicio</div></NavLink></li>
                <li><NavLink to="/Articulos" className={({ isActive }) => { return isActive ? "activado" : ""; }}><div className="menu-options">Artículos</div></NavLink></li>
                <li><NavLink to="/Directorio" className={({ isActive }) => { return isActive ? "activado" : ""; }}><div className="menu-options">Directorio</div></NavLink></li>
                <li className='container-subsubmenu'>
                  <div className="menu-options cursor-pointer">Promoción</div>

                  <ul className='sub-submenu  top-[100%] right-[0%] w-[180%]'>
                    <li className="menu__item container-submenu">
                      <a href='https://costachica.travel/' target='_blank' rel="noopener noreferrer">
                        <div className="menu__link cursor-pointer">
                          Mercadotecnia
                        </div>
                      </a>
                    </li>

                    <li className="menu__item container-submenu">
                      <div className="menu__link cursor-pointer">
                        Turismo social
                      </div>
                      <ul className="submenu top-[0%] right-[100%] w-[100%]">
                        <li className="menu__item" onClick={(e) => setBurgerActive(false)} >
                          <NavLink to="/Mapa" className={({ isActive }) => { return isActive ? "activado" : ""; }}>
                            <div className="menu__link">Hoteles
                              <img className="w-7 ml-2" loading="lazy" src={wheel} alt="ImagenGro" />
                            </div>
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                    
                    <li className="menu__item container-submenu">
                      <div className="menu__link cursor-pointer">
                        Turismo internacional
                      </div>
                      <ul className="submenu top-[0%] right-[100%] w-[100%]">
                        <li className="menu__item" onClick={(e) => setBurgerActive(false)} >
                          <NavLink to="/" className={({ isActive }) => { return isActive ? "activado" : ""; }}>
                            <div className="menu__link">Crucero
                            </div>
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li><NavLink to="/Planeacion" className={({ isActive }) => { return isActive ? "activado" : ""; }}><div className="menu-options">Planeación</div></NavLink></li>
                <li><NavLink to="/Transparencia" className={({ isActive }) => { return isActive ? "activado" : ""; }}><div className="menu-options">Transparencia</div></NavLink></li>
                <li><NavLink to="/Juridico" className={({ isActive }) => { return isActive ? "activado" : ""; }}><div className="menu-options">Juridico</div></NavLink></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>


      <div className='bg-[#DDC9A3] w-full lg:hidden flex justify-end'>
        <div className='ml-2 flex items-center w-full'>
          <p className='text-[#333333] font-medium PageTitle1 text-xl'>SECRETARÍA DE TURISMO</p>
        </div>

        <div className='container-menu z-[2000]'>
          <span onClick={(e) => setBurgerActive(true)} className="nav-bar cursor-pointer">
            <svg className="w-10 h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </span>
          {BurgerActive && (
            <nav className="main-nav">
              <ul className="menu PageTitle3">
                <li className="menu__item" onClick={(e) => setBurgerActive(false)} ><NavLink to="/" className={({ isActive }) => { return isActive ? "activado" : ""; }}><div className="menu__linkBurger">Inicio</div></NavLink></li>
                <li className="menu__item" onClick={(e) => setBurgerActive(false)} ><NavLink to="/Articulos" className={({ isActive }) => { return isActive ? "activado" : ""; }}><div className="menu__linkBurger">Artículos</div></NavLink></li>
                <li className="menu__item" onClick={(e) => setBurgerActive(false)} ><NavLink to="/Directorio" className={({ isActive }) => { return isActive ? "activado" : ""; }}><div className="menu__linkBurger">Directorio</div></NavLink></li>
                <li className='container-subsubmenu'>
                  <div className="menu__linkBurger">Promoción</div>
                  <ul className='sub-submenu top-[0%] right-[100%] w-[110%] PageText1'>

                    <li className="menu__item container-submenu">
                      <a href='https://costachica.travel/' target='_blank' rel="noopener noreferrer">
                        <div className="menu__linkBurger cursor-pointer">
                          Mercadotecnia
                        </div>
                      </a>
                    </li>

                    <li className="menu__item container-submenu">
                      <div className="menu__linkBurger cursor-pointer">
                        Turismo social
                      </div>
                      <ul className="submenu top-[100%] right-[0%] w-[100%]">
                        <li className="menu__item PageText2" onClick={(e) => setBurgerActive(false)} >
                          <NavLink to="/Mapa" className={({ isActive }) => { return isActive ? "activado" : ""; }}>
                            <div className="menu__SubBurger">Hoteles
                              <img className="w-5 ml-2" loading="lazy" src={wheel} alt="ImagenGro" />
                            </div>
                          </NavLink>
                        </li>
                      </ul>
                    </li>

                    <li className="menu__item container-submenu">
                      <div className="menu__linkBurger cursor-pointer">
                        Turismo internacional
                      </div>
                      <ul className="submenu top-[100%] right-[0%] w-[100%]">
                        <li className="menu__item PageText2" onClick={(e) => setBurgerActive(false)} >
                          <NavLink to="/" className={({ isActive }) => { return isActive ? "activado" : ""; }}>
                            <div className="menu__SubBurger">Crucero</div>
                          </NavLink>
                        </li>
                      </ul>
                    </li>

                  </ul>
                </li>
                <li className="menu__item" onClick={(e) => setBurgerActive(false)} ><NavLink to="/Planeacion" className={({ isActive }) => { return isActive ? "activado" : ""; }}><div className="menu__linkBurger">Planeación</div></NavLink></li>
                <li className="menu__item" onClick={(e) => setBurgerActive(false)} ><NavLink to="/Transparencia" className={({ isActive }) => { return isActive ? "activado" : ""; }}><div className="menu__linkBurger">Transparencia</div></NavLink></li>
                <li className="menu__item" onClick={(e) => setBurgerActive(false)} ><NavLink to="/Juridico" className={({ isActive }) => { return isActive ? "activado" : ""; }}><div className="menu__linkBurger">Juridico</div></NavLink></li>
              </ul >
            </nav>
          )
          }
        </div>
      </div>

    </div>
  )
}

export default HeaderSectur