import { useState } from 'react';
import facebook from '../assets/facebook.svg';
import twitter from '../assets/twitter.svg';
import telefono from '../assets/telefono.svg';
import edificio from '../assets/edificio.svg';
import tarjeta from '../assets/tarjeta.svg';
import logoFooter from "../assets/FooterGRO.png"; // Usando import directo
import '../styles/headergro.css';

function HeaderGro() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex flex-col w-full shadow-md">
      {/* --- BARRA SUPERIOR (Redes y Estrados) --- */}
      <div className="flex h-10 bg-white w-full border-b border-gray-100">
        <div className="flex flex-1">
          <a className="flex items-center px-4 border-r hover:bg-[#3b5998] hover:text-white transition-colors group" href="https://www.facebook.com/EvelynSalgadoP#" target="_blank" rel="noopener noreferrer">
            <img className="w-4 h-4 group-hover:invert transition" src={facebook} alt="FB" />
            <span className="hidden sm:block ml-2 text-xs font-bold uppercase">Facebook</span>
          </a>

          <a className="flex items-center px-4 border-r hover:bg-[#00acee] hover:text-white transition-colors group" href="https://twitter.com/EvelynSalgadoP" target="_blank" rel="noopener noreferrer">
            <img className="w-4 h-4 group-hover:invert transition" src={twitter} alt="TW" />
            <span className="hidden sm:block ml-2 text-xs font-bold uppercase">Twitter</span>
          </a>
        </div>

        <div className="flex items-center">
          <a className="px-4 flex items-center h-full hover:bg-gray-100 text-[10px] sm:text-xs font-bold text-[#666666]" target="_blank" rel="noopener noreferrer" href="https://www.guerrero.gob.mx/notificaciones-por-estrados/">
            NOTIFICACIONES ESTRADOS
          </a>
        </div>
      </div>

      {/* --- BARRA PRINCIPAL (GUINDA) --- */}
      <div className="bg-[#8A0D33] text-white w-full relative">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 py-2 lg:py-4">

          {/* Logo */}
          <div className="flex-shrink-0">
            <img className="h-12 md:h-16 lg:h-20 w-auto" src={logoFooter} alt="Logo Guerrero" />
          </div>

          {/* Icono Hamburguesa (Móvil) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2 focus:outline-none"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>

          {/* Navegación Desktop (Oculta en móviles) */}
          <div className="hidden xl:flex flex-col items-end gap-4">
            {/* Fila de Contacto/Links Rápidos */}
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <img className="w-7" src={telefono} alt="phone" />
                <div>
                  <p className="text-[10px] leading-none">TELÉFONO:</p>
                  <p className="text-[#DDC9A3] text-sm font-bold">01 (747) 47 1 9700</p>
                </div>
              </div>
              <a href="https://www.guerrero.gob.mx/dependencias/" target="_blank" className="flex items-center gap-2 hover:opacity-80 transition">
                <img className="w-7" src={edificio} alt="dep" />
                <div>
                  <p className="text-[10px] leading-none uppercase">Dependencias</p>
                  <p className="text-[#DDC9A3] text-sm font-bold whitespace-nowrap">Oficinas de gobierno</p>
                </div>
              </a>
              <a href="https://www.guerrero.gob.mx/directorio-de-gobierno/" target="_blank" className="flex items-center gap-2 hover:opacity-80 transition">
                <img className="w-7" src={tarjeta} alt="dir" />
                <div>
                  <p className="text-[10px] leading-none uppercase">Directorio</p>
                  <p className="text-[#DDC9A3] text-sm font-bold whitespace-nowrap">Funcionarios públicos</p>
                </div>
              </a>
            </div>

            {/* Fila de Menú Principal */}
            <ul className="flex gap-4 text-xs font-bold border-t border-white/20 pt-2">
              <li className="hover:text-[#DDC9A3] transition"><a href="https://www.guerrero.gob.mx/">INICIO</a></li>
              <li className="hover:text-[#DDC9A3] transition"><a href="https://www.guerrero.gob.mx/sala-de-prensa/">SALA DE PRENSA</a></li>
              <li className="hover:text-[#DDC9A3] transition"><a href="https://www.guerrero.gob.mx/servicios-en-linea/">SERVICIOS EN LÍNEA</a></li>
              <li className="hover:text-[#DDC9A3] transition"><a href="http://atencionenlinea.guerrero.gob.mx/client.php">ATENCIÓN EN LÍNEA</a></li>
              <li className="hover:text-[#DDC9A3] transition"><a href="https://transparencia.guerrero.gob.mx">TRANSPARENCIA</a></li>
            </ul>
          </div>
        </div>

        {/* --- MENÚ MÓVIL (DESPLEGABLE) --- */}
        <div className={`xl:hidden transition-all duration-300 overflow-hidden bg-[#700a29] ${isOpen ? "max-h-[600px] border-t border-white/10" : "max-h-0"}`}>
          <div className="p-4 space-y-6">
            {/* Contacto en móvil */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-3">
                <img className="w-8" src={telefono} alt="tel" />
                <p className="text-sm">TELÉFONO: <span className="font-bold text-[#DDC9A3]">01 (747) 47 1 9700</span></p>
              </div>
              <a href="https://www.guerrero.gob.mx/dependencias/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                <img className="w-8" src={edificio} alt="dep" />
                <p className="text-sm">DEPENDENCIAS</p>
              </a>
              <a href="https://www.guerrero.gob.mx/directorio-de-gobierno/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                <img className="w-8" src={tarjeta} alt="dir" />
                <p className="text-sm">DIRECTORIO</p>
              </a>
            </div>

            {/* Links en móvil */}
            <ul className="space-y-4 border-t border-white/20 pt-4 text-sm font-bold uppercase">
              <li><a className="block py-1" href="https://www.guerrero.gob.mx/">Inicio</a></li>
              <li><a className="block py-1" href="https://www.guerrero.gob.mx/sala-de-prensa/">Sala de Prensa</a></li>
              <li><a className="block py-1" href="https://www.guerrero.gob.mx/servicios-en-linea/">Servicios en línea</a></li>
              <li><a className="block py-1" href="https://transparencia.guerrero.gob.mx">Transparencia</a></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderGro;