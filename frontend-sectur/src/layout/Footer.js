function Footer() {
  return (
    <footer className="w-full h-72">
      <div className="bg-[#333333] h-[55%] flex justify-center xl:flex-row flex-col lg:px-24 md:px-2 px-0">
        <div className="flex items-center justify-center">
          <img className="w-80" loading="lazy" src={require("../assets/FooterGRO.png")} alt="imagebuilding" />
        </div>

        <div className="flex items-center lg:px-8 px-0">
          <p className="lg:text-base md:text-sm text-xs font-sans text-center text-[#B9CCBE]">
            Recinto del Poder Ejecutivo, Boulevard René Juárez Cisneros #62,
            Col. Cd. de los servicios, C.P 39074, Chilpancingo, Guerrero;
            México. (747) 47 1 9700
          </p>
        </div>
      </div>

      <div className="bg-[#292929] h-[45%] flex lg:px-24 px-2 text-center">
        <div className="flex items-center xl:w-2/5 w-3/5">
          <p className="lg:text-base md:text-sm text-xs font-sans text-[#565E5B]">
            Derechos Reservados © 2021 - 2027 Gobierno del Estado de Guerrero
          </p>
        </div>

        <div className="xl:w-3/5 w-2/5 flex xl:flex-row-reverse flex-col-reverse items-center justify-center mx-1 text-[#565E5B] lg:text-base md:text-sm text-xs font-sans sm:space-x-6 space-x-1">
          <div></div>

          <div className="hover:text-[#b0b5b3]">
            <a
              href="https://www.guerrero.gob.mx/aviso-de-privacidad/"
              target="_blank"
              rel="noopener noreferrer">
              Aviso de privacidad
            </a>
          </div>

          <div className="hover:text-[#b0b5b3]">
            <a
              href="https://www.guerrero.gob.mx/servicios-en-linea/"
              target="_blank"
              rel="noopener noreferrer">
              Servicios en línea
            </a>
          </div>

          <div className="hover:text-[#b0b5b3]">
            <a
              href="https://www.guerrero.gob.mx/sala-de-prensa/"
              target="_blank"
              rel="noopener noreferrer">
              Sala de prensa
            </a>
          </div>

          <div className="hover:text-[#b0b5b3]">
            <a
              href="https://www.guerrero.gob.mx/"
              target="_blank"
              rel="noopener noreferrer">
              Inicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer