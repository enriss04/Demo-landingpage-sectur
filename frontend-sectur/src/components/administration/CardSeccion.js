import { useNavigate } from 'react-router-dom'
import '../../styles/stylespage/cardSeccions.css'

export default function CardSeccion({ img, nombre, ruta }) {
    const navigate = useNavigate();

    return (
        <div className='flex flex-row rounded-3xl border shadow-lg w-80 h-36 CardStyle' onClick={() => navigate(`/` + ruta)}>
            <div className='flex items-center w-[40%]'>
                <img className='IMG_Section' src={require = ("../../" + img)} alt="img_seccion" />
            </div>
            <div className='flex items-center w-[60%]'>
                <p>{nombre}</p>
            </div>
        </div>
    )
}
