import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function PageInfoArticle() {
    const params = useParams();
    const navigate = useNavigate();

    const [ShowInformation, setShowInformation] = useState({
        titulo_articulo: '',
        subtitulo_articulo: '',
        puntos_articulo: '',
        informacion_articulo: ''
    });

    const [IMGsName, setIMGsname] = useState([{
        imagen_articulo: 'noimage.png'
    }]);


    const loadInformation = async (IDArticulo) => {
        const responseInformacionArt = await fetch(process.env.REACT_APP_URL_BACKEND + `/informacion_articulo/${IDArticulo}`)
        const dataInformacionArt = await responseInformacionArt.json()

        if (dataInformacionArt.message) {
            alert(dataInformacionArt.message);
            return
        }

        setShowInformation(dataInformacionArt);

        const respon = await fetch(process.env.REACT_APP_URL_BACKEND + `/imagenes_articulo/${dataInformacionArt.id_informacionart}`)
        const InfoIMG = await respon.json()

        if (InfoIMG.message) {
            alert(InfoIMG.message);
            return
        }
        setIMGsname(InfoIMG)
    }

    useEffect(() => {
        if (params.id) {
            loadInformation(params.id);
        } else {

        }
    }, [params.id])

    return (
        <div className='flex flex-col'>
            <div className='flex flex-col items-center'>
                <div className='flex flex-col bg-slate-300 justify-center items-center rounded-sm shadow-lg mx-3 mt-4'>
                    <p className='text-4xl text-center mx-2 mt-2 font-bold text-[#272626]'>{ShowInformation.titulo_articulo}</p>
                    <div className='flex mt-4 gap-x-4 mb-4'>
                        <button type="button" className="btn2 btn-primary font-extrabold text-lg" onClick={() => navigate(`/`)}>
                            Inicio
                        </button>
                        <button type="button" className="btn2 btn-primary font-extrabold text-lg" onClick={() => navigate(`/Articulos`)}>
                            Más articulos
                        </button>
                    </div>
                </div>

                <div className='mt-14 mb-8 w-full'>
                    <p className='mx-10 text-3xl text-left font-semibold text-[#313030]'>{ShowInformation.subtitulo_articulo}</p>
                </div>
                <div className='mb-8 w-full'>
                    <ul className='flex flex-col items-start gap-y-7 font-semibold mx-3 whitespace-pre-line list-disc'>
                        {
                            ShowInformation.puntos_articulo.split('\n').map((line, index) => (
                                <li className='text-xl mx-8 font-semibold text-[#313030]' key={index}>
                                    {line}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='mb-12'>
                    <p className='text-justify font-medium mx-8 text-lg whitespace-pre-line indent-8 text-[#313030]'>{ShowInformation.informacion_articulo}</p>
                </div>
            </div>

            <div>
                <div className="flex flex-row justify-center flex-wrap w-full gap-y-14 gap-x-20 mb-14 ">
                    {
                        IMGsName.map((info, index) => {
                            return (
                                <div key={index}>
                                    <img className="w-[320px] h-[280px] rounded-2xl shadow-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300" loading='lazy' src={require = (process.env.REACT_APP_GET_IMG_INFOARTICULO + info.imagen_articulo)} alt="Avatar" />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div >
    )
}
