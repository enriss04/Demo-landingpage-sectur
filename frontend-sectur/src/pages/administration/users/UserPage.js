import CardSection from '../../../components/administration/CardSeccion'
import Cookies from 'universal-cookie'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function UserPage() {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const CloseSession = () => {
    cookies.remove('usuario', { path: "/" });
    navigate('/iniciar_sesion')
  }

  return (
    <div className='relative'>
      <div className='absolute top-1 right-2'>
        <Button variant="contained" size='large' type='submit' onClick={CloseSession}>Cerrar sesión</Button>
      </div>

      <div className='text-center'>
        <p className='my-2 text-3xl font-bold'>Bienvenido {cookies.get('usuario')}</p>
        <p className='my-2 text-xl'>¿Qué sección de la página de la secretaría de turismo desea revisar?</p>
      </div>
      <div className='flex flex-row justify-center items-center gap-x-8 flex-wrap h-52'>
        <CardSection img="Gro.png" nombre="Ubicaciones de los hoteles inclusivos del mapa" ruta="consultar_hoteles" />
        <CardSection img="Gro.png" nombre="Articulos publicados en la pagina" ruta="consultar_articulos" />
      </div>

    </div>
  )
}
