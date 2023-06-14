import { Button, TextField, CircularProgress } from '@mui/material'
import '../../styles/stylesMap/login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from "universal-cookie"

export default function Login() {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const expresiones = {
    usuario: /^[a-zA-Z0-9]{1,8}$/, // Letras, numeros, guion y guion_bajo
    //nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    //password: /^.{4,12}$/, // 4 a 12 digitos.
    //correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    //telefono: /^\d{7,14}$/ // 7 a 14 numeros.
  }

  const [credential, setCredential] = useState({
    userName: '',
    userPassword: '',
  })
  
  const [loading, setLoading] = useState(false);
  const [statusN, setStatusN] = useState(false);
  const [statusP, setStatusP] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (statusN && statusP) {
      setLoading(true)

      const response = await fetch(process.env.REACT_APP_URL_BACKEND + `/validate/${credential.userName},${credential.userPassword}`)
      const data = await response.json()

      if (data.message) {
        alert(data.message)
      } else {
        cookies.set('usuario', data.username, { path: "/" });
        navigate('/pagina_principal')
      }
      setLoading(false)
    } else {
      alert("No se aceptan caracteres especiales");
    }
  };


  const handleChange = e => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
  }

  const ValidateName = () => {
    if (expresiones.usuario.test(credential.userName)) {
      setStatusN(true);
    } else {
      setStatusN(false);
    }
  }

  const ValidatePass = () => {

    if (expresiones.usuario.test(credential.userPassword)) {
      setStatusP(true);
    } else {
      setStatusP(false);
    }
  }

  return (
    <div className='grid my-10 place-items-center'>
      <form className='container-form' onSubmit={handleSubmit}>
        <h3 className='TitleLogin'>Iniciar sesión</h3>

        <div className="form-group mt-5">
          <label className='LabelStyle'>Nombre de la cuenta</label>
          <TextField onKeyUp={ValidateName} onChange={handleChange} name="userName" id="filled-basic" label="Nombre cuenta" size="small" variant="filled" />
        </div>

        <div className="form-group mt-2 mb-6">
          <label className='LabelStyle'>Contraseña</label>
          <TextField onKeyUp={ValidatePass} onChange={handleChange} name="userPassword" size="small" id="filled-password-input" label="Password" type="password" autoComplete="current-password" variant="filled" />
        </div>

        <div className='flex justify-center '>

          <Button variant="contained" size='large' type='submit' disabled={!credential.userName || !credential.userPassword}>
            {loading ?
              (<CircularProgress color='inherit' size={24} />)
              :
              (
                "Ingresar"
              )
            }
          </Button>

        </div>

      </form>
    </div>
  )
}
