import "../../styles/mainpage.css"
import { useState } from "react";
import ImageZoom from "react-image-zooom";
import GeneralCard from "../../components/main/CardInformation";

import phone from "../../assets/assetsMap/icons/phone.svg"
import ubication from "../../assets/assetsMap/icons/direcction.svg"
import correo from "../../assets/assetsMap/icons/correo.svg"

function MainPage() {

  const [modal, setModal] = useState(false);
  {/*  const [ShowMessage, setShowMessage] = useState(true);*/}
  const [modalOrga, setModalOrga] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  {/*
  const CloseMessage = () => {
    setShowMessage(false);
  };
  */}

  const toggleModalOrga = () => {
    setModalOrga(!modalOrga);
  };

  if (modal) {
    document.body.classList.add('active-modal-sec')
  } else {
    document.body.classList.remove('active-modal-sec')
  }
  
  if (modalOrga) {
    document.body.classList.add('active-modal-orga')
  } else {
    document.body.classList.remove('active-modal-orga')
  }

  {/*
  if (ShowMessage) {
    document.body.classList.add('active-modal-Message')
  } else {
    document.body.classList.remove('active-modal-Message')
  }
  */}

  return (
    <div className="flex xl:flex-row flex-col w-full">

      <div className="flex flex-col xl:px-7 px-4 xl:pt-7 pt-4 xl:w-4/12 w-full">
        <div className="flex justify-center text-center mb-4">
          <p className="text-black text-2xl  border-b-4 PageTitle3 border-[#890E33] w-[290px]">Titular de la dependencia</p>
        </div>

        <div className="w-full flex justify-center">
          <div className="relative w-96 h-96">
            <img className="rounded-lg w-full h-full" loading="lazy" src={require("../../assets/Secretario-Turismo.png")} alt="secretario" />
            <div className="content flex justify-center rounded-lg">
              <p onClick={toggleModal} className="bg-[#FFFFFF] w-60 py-1 rounded-lg shadow-lg font-bold text-lg text-center PageText2 text-[#444444] cursor-pointer">LIC. Santos Ramírez Cuevas</p>
              {modal && (
                <div className="modal z-[10000]">
                  <div onClick={toggleModal} className="overlay-image"></div>
                  <div className="modal-content text-[#615853] xl:w-[850px] w-[380px] xl:h-[600px] h-auto overflow-auto">
                    <div className="pl-2">
                      <p className="xl:text-2xl md:text-xl sm:text-lg text-base font-bold PageText2">Semblanza</p>
                    </div>
                    <div className="xl:text-lg md:text-xl sm:text-lg text-base text-[#615853] font-medium text-center py-2">
                      <p className="PageText1">Lic. Santos Ramírez Cuevas</p>
                      <p className="PageText1">Titular de Secretaría de Turismo</p>
                    </div>
                    <div className="w-full h-full">
                      <img loading="lazy" src={require("../../assets/secretario-info.jpg")} alt="info" />
                    </div>
                  </div>

                  <div className='cursor-pointer w-12 absolute xl:left-[96%] left-[89%] top-[1%]'>
                    <img className="invert" loading="lazy" src={require("../../assets/assetsMap/icons/close.png")} alt="Icon" onClick={toggleModal} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="my-4">
          <GeneralCard Image={phone} titleInfo="TELÉFONO" TextInfo="(744) 435 1980 ext 1018" />
          <GeneralCard Image={correo} titleInfo="CORREO ELECTRÓNICO" TextInfo="secretariadeturismo@guerrero.gob.mx" />
          <GeneralCard Image={ubication} titleInfo="DIRECCIÓN" TextInfo={"Vasco de Gamma 6 y 7, Fracc. Costa Azul. C.P. 39850 Acapulco, Gro."} />
        </div>



        <div className="flex items-center flex-col w-full">
          <a className="Doc-Card cursor-pointer" href="https://transparencia.guerrero.gob.mx/sujeto_obligado/oficina-de-la-gubernatura/secretaria-de-turismo/">
            <div className="Doc-Image">
              <img className="p-2" loading="lazy" src={require("../../assets/Gro.png")} width="540" height="303" alt="Blog post" />
            </div>

            <div className="flex flex-col w-10/12 h-full justify-center items-start space-y-2 ml-2">
              <div>
                <p className="Title-DocCard PageTitle2">Transparencia:</p>
              </div>
              <div>
                <p className="Text-DocCard PageText1">Información pública de oficio de la dependencia</p>
              </div>
            </div>
          </a>

          <div className="Doc-Card" >
            <div className="Doc-Image">
              <img className="p-2 cursor-pointer" loading="lazy" src={require("../../assets/Gro.png")} alt="example" onClick={toggleModalOrga} />
              {modalOrga && (
                <div className="modal z-[10000]">
                  <div onClick={toggleModalOrga} className="overlay-image"></div>
                  <div className="modal-content xl:w-[900px] w-[380px] ">
                    <div>
                      <ImageZoom loading="lazy" src={require("../../assets/OrganogramaTurismo.jpg")} alt="Image-organigrama" zoom="400" />
                    </div>
                  </div>

                  <div className='cursor-pointer w-12 absolute xl:left-[96%] left-[89%] top-[1%]'>
                    <img className="invert" loading="lazy" src={require("../../assets/assetsMap/icons/close.png")} alt="Icon" onClick={toggleModalOrga} />
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col w-10/12 h-full justify-center items-start space-y-2 ml-2">
              <div>
                <p className="Title-DocCard PageTitle2">Organigrama</p>
              </div>
              <div>
                <p className="Text-DocCard PageText1">Descargar</p>
              </div>
            </div>
          </div>

          <div className="Doc-Card cursor-pointer">
            <div className="Doc-Image">
              <img className="p-2" loading="lazy" src={require("../../assets/Gro.png")} width="540" height="303" alt="Blog post" />
            </div>

            <div className="flex flex-col w-10/12 h-full justify-center items-start space-y-2 ml-2">
              <div>
                <p className="Title-DocCard PageTitle2">Sitio web oficial</p>
              </div>
              <div>
                <p className="Text-DocCard PageText1">Visitar</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="xl:w-8/12 pt-7 xl:mx-6 mx-3">

        <div className="mb-4">
          <div className="flex flex-row justify-center text-[#AB2241]">
            <svg className="xl:w-20 md:w-16 w-14 text-center" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
            <p className="ml-2 xl:py-6 py-2 text-4xl font-medium PageTitle2">MISIÓN:</p>
          </div>
          <div className="xl:mx-10 mx-5 text-justify text-xl text-[rgb(75,77,80)] PageText1">
            <p>Lograr un compromiso con los diferentes actores del sector turístico, implementando estrategias innovadoras sustentables
              y competitivas orientadas al desarrollo y promoción de los destinos turísticos guerrerenses. <br /><br />
              OBJETIVO GENERAL: Promover, regular y fomentar el desarrollo turístico del Estado de Guerrero,
              procurando un óptimo aprovechamiento de los recursos y atractivos naturales.</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-row justify-center text-[#AB2241]">
            <svg className="xl:w-20 md:w-16 w-14 text-center" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            <p className="ml-2 xl:py-6 py-2 text-4xl font-medium PageTitle2">VISIÓN:</p>
          </div>
          <div className="xl:ml-10 mx-5 text-justify text-xl text-[rgb(75,77,80)] PageText1">
            <p>Ser una Secretaría modelo, que integra al sector turístico,
              detectando necesidades y planteando estrategias de desarrollo
              en el Estado de Guerrero.</p>
          </div>
        </div>

        <div>
          <div className="flex flex-row text-[#AB2241] justify-center">
            <p className="xl:py-4 py-2 text-4xl font-medium PageTitle2">MARCO JURÍDICO:</p>
          </div>
          <ul className="list-group text-xl text-[rgb(75,77,80)] text-justify PageText1">
            <li><span className="badge">1</span>Constitución Política del Estado Libre y Soberano de Guerrero</li>
            <li><span className="badge">2</span>Ley número 137 de Turismo del Estado de Guerrero</li>
            <li><span className="badge">3</span>Ley de Fomento al Turismo</li>
            <li><span className="badge">4</span>Ley Orgánica de la Administración Pública del Estado de Guerrero Número 433</li>
            <li><span className="badge">5</span>Ley de Regulación y Fomento del Sistema de Tiempo Compartido del Estado de Guerrero</li>
            <li><span className="badge">6</span>Ley Número 674 de Responsabilidades de los Servidores Públicos del Estado de Guerrero</li>
            <li><span className="badge">7</span>Ley de Trabajo de los Servidores Públicos del Estado de Guerrero Número 248</li>
            <li><span className="badge">8</span>Reglamento Interior de la Secretaría de Fomento Turístico del Estado de Guerrero</li>
            <li><span className="badge">9</span>Reglamento de la Ley Número 137 de Turismo del Estado de Guerrero</li>
            <li><span className="badge">10</span>Reglamento para la Regulación y Fomento del Sistema de Tiempo Compartido del Estado de Guerrero</li>
            <li><span className="badge">11</span>Acuerdo para designar al Presidente de la Comisión de Tiempo Compartido</li>
          </ul>
        </div>
      </div>
      {/*
      {ShowMessage && (
        <div className="ContenedorMensaje z-[10000]">
          <div onClick={CloseMessage} className="overlay-MessageImg">
            <div className="modal-MessageImg xl:w-[900px] lg:w-[750px] md:w-[550px] sm:w-[450px] w-[350px]">
              <div className="w-full h-full">
                <img loading="lazy" src={require("../../assets/NewYear.jpg")} alt="mensaje" />
              </div>
            </div>
          </div>
        </div>
      )}
      */}
    </div>
  )
}

export default MainPage