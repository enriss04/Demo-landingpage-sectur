import { Button, TextField, Autocomplete, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import icon from '../../../../assets/assetsMap/icons/close.svg'

export default function ListHoteles() {
    const navigate = useNavigate()

    const [value, setValue] = useState(null);
    const [Hotels, setHotels] = useState([{
        latitud: '',
        longitud: '',
        nombre_h: '',
        direccion_h: '',
        telefono_h: '',
        src_imagen: 'noimage.png',
        fk_areaaca: 0
    }])

    const handleConfirm = (name) => {
        const confirmed = window.confirm("¿Estás seguro que deseas realizar esta acción?");
        if (confirmed) {
            handleDelete(name)
        }
    };

    const loadHotels = async () => {
        const response = await fetch(process.env.REACT_APP_URL_BACKEND + '/crud')
        const data = await response.json()

        if (data.message) {
            alert(data.message);
            return
        }

        setHotels(data)
    }

    const handleDelete = async (nameHotel) => {
        const response = await fetch(process.env.REACT_APP_URL_BACKEND + `/select-hotel/${nameHotel}`)
        const data = await response.json()

        if (data.message) {
            alert(data.message);
            return
        }

        const IMGDelete = await fetch(process.env.REACT_APP_URL_BACKEND + '/deleteImgHotel', {
            method: "POST",
            body: JSON.stringify({ "nameImg": data.src_imagen }),
            headers: { "Content-Type": "application/json" },
        })
        const dataIMG = IMGDelete.json()

        if (dataIMG.message) {
            alert(dataIMG.message);
            return
        }

        const IMG_BD = await fetch(process.env.REACT_APP_URL_BACKEND + `/crud/${nameHotel}`, {
            method: "DELETE",
        })
        const dataIMG_BD = await IMG_BD.json()

        if (dataIMG_BD.message) {
            alert(dataIMG_BD.message);
            return
        }

        setHotels(Hotels.filter(hotel => hotel.nombre_h !== nameHotel));
    }

    useEffect(() => {
        loadHotels()
    }, [])

    useEffect(() => {
        window.addEventListener("scroll", () => {
            var elem = document.getElementById("SelectCard");
            if (elem) {
                if (window.scrollY <= 213 && window.scrollY >= 0) {
                    document.getElementById('SelectCard').style.top = "45%";
                } else {
                    document.getElementById('SelectCard').style.top = "10%";
                }
            }
        })
    }, [])

    const defaultProps = {
        options: Hotels,
        getOptionLabel: (option) => option.nombre_h,
    };

    return (
        <div className='flex flex-row relative'>
            <div className='absolute top-2 right-2'>
                <img onClick={() => navigate(`/pagina_principal`)} className="w-7 pointer" loading="lazy" src={icon} alt="icon" />
            </div>

            <div className='w-[550px]'>
                <div className='fixed top-[30%] left-7 h-[270px] w-3/12 bg-[#E7D2AC] rounded-lg shadow-lg' id='SelectCard'>

                    <div className='ml-4 my-8'>
                        <p className='my-2 text-lg font-serif'>Agregar nueva ubicación</p>
                        <Link to="/agregar_hotel">
                            <Button variant="contained" size='medium'>Click</Button>
                        </Link>
                    </div>

                    <div className='ml-4 my-7'>
                        <p className='my-2 text-lg font-serif'>Nombre del hotel</p>
                        <div className='flex flex-row space-y-3 w-[300px]'>
                            <div className='w-96'>
                                <Autocomplete
                                    {...defaultProps}
                                    onChange={(event, newValue) => {
                                        {
                                            newValue === null ?
                                                setValue(null)
                                                :
                                                setValue("#" + newValue.nombre_h);
                                        }
                                    }}
                                    id="auto-complete"
                                    autoComplete
                                    autoSelect
                                    includeInputInList
                                    renderInput={(params) => (
                                        <TextField {...params} label="Nombre" variant="standard" />
                                    )}
                                />
                            </div>
                            {value === null ?
                                <div>
                                    <IconButton variant="contained" size='small' disabled>
                                        <SearchIcon />
                                    </IconButton>
                                </div>
                                :
                                <a href={value}>
                                    <IconButton variant="contained" size='small' color='primary'>
                                        <SearchIcon />
                                    </IconButton>
                                </a>
                            }
                        </div>
                    </div>

                </div>

            </div>

            <div className='flex flex-col w-full items-center gap-y-8 my-10'>
                {
                    Hotels.map((hotel, index) => (
                        <div className='flex flex-col bg-[#DFE4EA] rounded-3xl border shadow-md w-[750px] h-64' key={index} id={hotel.nombre_h}>
                            <div className='h-[80%] w-full'>
                                <div className='flex flex-row h-full'>
                                    <div className='flex justify-center items-center w-[38%]'>
                                        <img className="w-[240px] h-[180px] rounded-xl" loading="lazy" src={require = (process.env.REACT_APP_GET_IMG_HOTEL + hotel.src_imagen)} alt="logo" />
                                    </div>
                                    <div className='flex flex-col justify-center items-start gap-y-1 w-[62%]'>
                                        <div>Latitud: {hotel.latitud}</div>
                                        <div>Longitud: {hotel.longitud}</div>
                                        <div>Nombre del hotel: {hotel.nombre_h}</div>
                                        <div>Dirección del hotel: {hotel.direccion_h}</div>
                                        <div>Teléfono del hotel: {hotel.telefono_h}</div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-center items-center gap-x-7 h-[20%]'>
                                <Button variant="contained" size='medium' onClick={() => navigate(`/actualizar_hotel/${hotel.id_locacion}`)}>Actualizar</Button>
                                <Button variant="contained" size='medium' onClick={() => handleConfirm(hotel.nombre_h)}>Eliminar</Button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
