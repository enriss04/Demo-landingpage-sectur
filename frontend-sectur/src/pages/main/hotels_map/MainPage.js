import { Button, TextField, Autocomplete, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react'

import { MapContainer, TileLayer } from 'react-leaflet';
import Markers from '../../../components/main/map/Markers';
import '../../../styles/stylesMap/map.css'
import BackToTop from '../../../components/main/BackToTop';
import BackToCenter from '../../../components/main/BackToCenter';
import BackToBotton from '../../../components/main/BackToBotton';

export default function MainPage() {
    const [Respaldo, setRespaldo] = useState([{
        latitud: '',
        longitud: '',
        nombre_h: '',
        direccion_h: '',
        telefono_h: '',
        src_imagen: '',
        fk_areaaca: 0
    }])
    const [ubications, setUbications] = useState({
        latitud: '',
        longitud: '',
        nombre_h: '',
        direccion_h: '',
        telefono_h: '',
        src_imagen: '',
        fk_areaaca: 0
    })
    const [value, setValue] = useState(null)
    const [State, setState] = useState(false)
    const [map, setMap] = useState(null)

    const CargarUbicaciones = async () => {
        const response = await fetch(process.env.REACT_APP_URL_BACKEND + '/crud')
        const data = await response.json()
        if (data.message) {
            alert(data.message);
            return
        }
        setUbications(data)
        setRespaldo(data)
    }

    const ShowSingleHotel = async (e, nameHotel) => {
        map.setView([16.84477839135118, -99.87350399983222], 11)

        const singleH = await fetch(process.env.REACT_APP_URL_BACKEND + `/select-hotel/${nameHotel}`)
        const data = await singleH.json()
        if (data.message) {
            alert(data.message);
            return
        }
        setUbications([{
            "latitud": data.latitud,
            "longitud": data.longitud,
            "nombre_h": data.nombre_h,
            "direccion_h": data.direccion_h,
            "telefono_h": data.telefono_h,
            "src_imagen": data.src_imagen
        }])
        setState(true)
    }

    const ShowHotels = async () => {
        map.setView([16.84477839135118, -99.87350399983222], 11)

        const response = await fetch(process.env.REACT_APP_URL_BACKEND + '/crud')
        const data = await response.json()
        if (data.message) {
            alert(data.message);
            return
        }
        setUbications(data)
        setState(false)
    }

    useEffect(() => {
        CargarUbicaciones()
    }, [])

    const defaultProps = {
        options: Respaldo,
        getOptionLabel: (option) => option.nombre_h,
    };

    return (
        <div className='flex flex-col items-center w-full h-[100vh]'>
            <div className='h-full w-full relative'>
                <div className="absolute top-2 left-14 xl:right-[700px] lg:right-[450px] md:right-[180px] sm:right-10 right-2 flex xl:flex-row lg:flex-row md:flex-row sm:flex-row flex-col justify-center items-center gap-x-2 gap-y-2 z-[1200]  bg-[#E4DCAB] rounded-lg p-3">
                    <div className="flex flex-wrap flex-row justify-center items-center gap-y-1 gap-x-2">

                        <div className="flex justify-center items-center">
                            <Autocomplete
                                {...defaultProps}
                                onChange={(event, newValue) => {
                                    {
                                        newValue === null ?
                                            setValue(null)
                                            :
                                            setValue(newValue.nombre_h);
                                    }
                                }}
                                id="auto-complete"
                                sx={{ width: 240 }}
                                autoComplete
                                autoSelect
                                includeInputInList
                                renderInput={(params) => (
                                    <TextField {...params} label="Buscar hotel" variant="standard" />
                                )}
                            />
                            <div className=''>
                                <IconButton color="primary" size="large" disabled={!value} onClick={evt => ShowSingleHotel(evt, value)}>
                                    <SearchIcon />
                                </IconButton>
                            </div>
                        </div>

                    </div>

                    <Button variant="contained" size='medium' disabled={!State} onClick={evt => ShowHotels()}>Ver hoteles</Button>
                </div>


                <div className='h-full'>
                    <div className="ContainerMap">
                        <MapContainer center={{ lat: '16.84477839135118', lng: '-99.87350399983222' }} zoom={11} scrollWheelZoom={false} ref={setMap}>
                            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                            <Markers informacion={ubications} />
                        </MapContainer >
                    </div >
                </div>
            </div>
            <div className='z-[1000] lg:hidden flex'>
                <BackToTop />
                <BackToCenter />
                <BackToBotton />
            </div>
        </div>
    )
}
