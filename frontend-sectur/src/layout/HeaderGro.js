import facebook from '../assets/facebook.svg'
import twitter from '../assets/twitter.svg'

import telefono from '../assets/telefono.svg'
import edificio from '../assets/edificio.svg'
import tarjeta from '../assets/tarjeta.svg'
import '../styles/headergro.css'

function HeaderGro() {

  return (
    <header className="flex flex-col">

      <div className='flex h-12 bg-white w-full'>

        <a className='flex MainContainer border-r-2 hover:bg-[#3b5998]' href='https://www.facebook.com/EvelynSalgadoP#' target='_blank' rel="noopener noreferrer">
          <div className='ContainerLogo'>
            <img className="icons" loading="lazy" src={facebook} alt="imagecard" />
          </div>

          <div className='ContainerWord'>
            <div className="overlay">
              <div className="text font-bold">Facebook</div>
            </div>
          </div>
        </a>

        <a className='flex MainContainer hover:bg-[#00acee]' href='https://twitter.com/EvelynSalgadoP' target='_blank' rel="noopener noreferrer">
          <div className='ContainerLogo '>
            <img className="icons" loading="lazy" src={twitter} alt="imagecard" />
          </div>

          <div className='ContainerWord'>
            <div className="overlay">
              <div className="text font-bold">Twitter</div>
            </div>
          </div>
        </a>

        <div className="w-full flex items-center justify-end text-sm font-bold text-[#666666]">
          <a className="flex justify-center items-center hover:bg-[#EEEEEE] h-full" href="https://www.guerrero.gob.mx/notificaciones-por-estrados/">
            <p className="mx-2">NOTIFICACIONES ESTRADOS</p>
          </a>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between w-full bg-[#8A0D33]">

        <div className="xl:ml-24 ml-4">
          <div>
            <img className="w-full" loading="lazy" src={require("../assets/FooterGRO.png")} alt="ImagenGro" />
          </div>
        </div>

        <div className="MenuDiv">
          <div className="xl:hidden lg:hidden md:hidden sm:flex flex cursor-pointer">
            <svg
              className="w-10 h-full"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </div>

          <div className="OptionMenu">
            <div className="flex xl:flex-row lg:flex-row md:flex-row sm:flex-col flex-col justify-center h-[50%] gap-4 divide-slate-500 mx-2">
              <div className='flex flex-row justify-center items-center gap-3'>
                <div className=''>
                  <img className="w-9" loading="lazy" src={telefono} alt="imagephone" />
                </div>
                <div className=''>
                  <p className='TextNav'>TELÉFONO:</p>
                  <p className='text-[#9F2241] TextNav font-bold'>01 (747) 47 1 9700</p>
                </div>
              </div>

              <a className='flex flex-row justify-center items-center gap-3' href='https://www.guerrero.gob.mx/dependencias/' target='_blank' rel="noopener noreferrer">
                <div className=''>
                  <img className="w-9" loading="lazy" src={edificio} alt="imagebuilding" />
                </div>
                <div className=''>
                  <p className='TextNav'>DEPENDENCIAS</p>
                  <p className='text-[#9F2241] TextNav font-bold'>Oficinas de gobierno</p>
                </div>
              </a>

              <a className='flex flex-row justify-center items-center gap-3' href='https://www.guerrero.gob.mx/directorio-de-gobierno/' target='_blank' rel="noopener noreferrer">
                <div className=''>
                  <img className="w-9" loading="lazy" src={tarjeta} alt="imagecard" />
                </div>
                <div className=''>
                  <p className='TextNav'>DIRECTORIO</p>
                  <p className='text-[#9F2241] TextNav font-bold'>Funcionarios públicos</p>
                </div>
              </a>
            </div>

            <ul className='flex xl:flex-row lg:flex-row md:flex-row sm:flex-col flex-col justify-center items-center gap-3 h-[50%] mx-2'>
              <li>
                <a href='https://www.guerrero.gob.mx/' target='_blank' rel="noopener noreferrer">
                  <div className='MenuOption'>INICIO</div>
                </a>
              </li>
              <li>
                <a href='https://www.guerrero.gob.mx/sala-de-prensa/' target='_blank' rel="noopener noreferrer">
                  <div className='MenuOption'>SALA DE PRENSA</div>
                </a>
              </li>
              <li>
                <a href='https://www.guerrero.gob.mx/servicios-en-linea/' target='_blank' rel="noopener noreferrer">
                  <div className='MenuOption'>SERVICIOS EN LÍNEA</div>
                </a>
              </li>
              <li>
                <a href='http://atencionenlinea.guerrero.gob.mx/client.php' target='_blank' rel="noopener noreferrer">
                  <div className='MenuOption'>ATENCIÓN EN LÍNEA</div>
                </a>
              </li>
              <li>
                <a href='https://transparencia.guerrero.gob.mx' target='_blank' rel="noopener noreferrer">
                  <div className='MenuOption'>TRANSPARENCIA</div>
                </a>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderGro