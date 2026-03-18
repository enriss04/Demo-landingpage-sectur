import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import wheel from "../assets/assetsMap/icons/wheel.png";

const HeaderSectur = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();

  // Cerrar todo al cambiar de página
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveSubmenu(null);
  }, [location]);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Artículos', path: '/Articulos' },
    {
      name: 'Promoción',
      submenu: [
        { name: 'Mercadotecnia', path: 'https://costachica.travel/', external: true },
        { name: 'Turismo social', path: '/Mapa', icon: wheel },
      ]
    },
    { name: 'Transparencia', path: '/Transparencia' },
  ];

  return (
    <header className="relative z-[5000] w-full bg-[#e7d2ac] text-[#333333] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">

          {/* Título Principal */}
          <div className="flex-shrink-0">
            <h1 className="text-xl lg:text-2xl font-bold tracking-tighter PageTitle1">
              SECRETARÍA DE TURISMO
            </h1>
          </div>

          {/* --- NAVEGACIÓN ESCRITORIO --- */}
          <nav className="hidden lg:flex items-center h-full">
            <ul className="flex h-full items-center space-x-1">
              {navLinks.map((link) => (
                <li key={link.name} className="relative group h-full flex items-center">
                  {link.path ? (
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `px-4 py-2 transition-all hover:text-amber-800 font-medium ${isActive ? "border-b-2 border-amber-900" : ""}`
                      }
                    >
                      {link.name}
                    </NavLink>
                  ) : (
                    <div className="px-4 py-2 cursor-pointer flex items-center hover:text-amber-800 font-medium">
                      {link.name}
                      <svg className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  )}

                  {/* Primer Submenú (Promoción) */}
                  {link.submenu && (
                    <ul className="absolute left-0 top-full w-52 bg-white shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 border-t-2 border-amber-700 py-2">
                      {link.submenu.map((sub) => (
                        <li key={sub.name} className="relative group/item">
                          {sub.external ? (
                            <a href={sub.path} target="_blank" rel="noopener noreferrer" className="block px-4 py-3 hover:bg-amber-50 text-sm transition-colors">
                              {sub.name}
                            </a>
                          ) : (
                            <NavLink
                              to={sub.path}
                              className="flex items-center px-4 py-3 hover:bg-amber-50 text-sm transition-colors"
                            >
                              {sub.name}
                            </NavLink>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* --- BOTÓN MÓVIL --- */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-amber-900"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* --- MENÚ MÓVIL --- */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? "max-h-screen bg-[#DDC9A3]" : "max-h-0"}`}>
        <nav className="px-4 pt-2 pb-8 space-y-1">
          {navLinks.map((link) => (
            <div key={link.name} className="border-b border-amber-200/50">
              {link.path ? (
                <NavLink to={link.path} className="block py-4 font-bold">{link.name}</NavLink>
              ) : (
                <>
                  <button
                    onClick={() => setActiveSubmenu(activeSubmenu === link.name ? null : link.name)}
                    className="w-full flex justify-between items-center py-4 font-bold"
                  >
                    {link.name} <span>{activeSubmenu === link.name ? '−' : '+'}</span>
                  </button>
                  {activeSubmenu === link.name && (
                    <div className="pl-4 pb-4 space-y-2">
                      {link.submenu.map(sub => (
                        <div key={sub.name}>
                          {sub.external ? (
                            <a href={sub.path} className="block py-2 text-sm opacity-80">{sub.name}</a>
                          ) : (
                            <NavLink
                              to={sub.path}
                              className="block py-2 text-sm opacity-80"
                            >
                              {sub.name}
                            </NavLink>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default HeaderSectur;