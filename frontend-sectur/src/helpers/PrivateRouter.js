import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie'

export default function PrivateRouter() {
    const cookies = new Cookies();

    return (
        cookies.get('usuario') ? <Outlet /> : <Navigate to="iniciar_sesion" />
    )
}
