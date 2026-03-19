import { useState, useEffect } from 'react'
import { Button, CircularProgress, TextField, Autocomplete, Tooltip } from '@mui/material'
import '../../../../styles/stylesMap/insertupdate.css'
import { useNavigate, useParams } from 'react-router-dom'
import icon from '../../../../assets/assetsMap/icons/close.svg'
import MyMiniMap from '../../../../components/main/map/MapView'
import { expresiones } from '../../../../helpers/expresiones_regulares'

export default function InsertUpdate() {
    const navigate = useNavigate();
    const params = useParams();

    const zones = ['Zona tradicional', 'Zona dorada', 'Zona diamante', 'Pie de la cuesta', ''];
    const [Image, setImage] = useState(null);
    const [CurrentImg, setCurrentIMG] = useState('noimage.png');
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [InformationU, setInformationU] = useState({
        latitud: '',
        longitud: '',
        nombre_h: '',
        direccion_h: '',
        telefono_h: '',
        src_imagen: '',
        fk_areaaca: null
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (expresiones.numeros.test(InformationU.telefono_h)) {

            if (expresiones.texto.test(InformationU.nombre_h)) {

                if (expresiones.latitud.test(InformationU.latitud) && expresiones.longitud.test(InformationU.longitud)) {
                    
                    setLoading(true)

                    if (editing) {

                        if (Image === null) {

                            const response = await fetch(process.env.REACT_APP_URL_BACKEND + `/crud/${params.id}`, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(InformationU),
                                method: 'GET',
                                mode: 'cors',
                            });

                            const data = await response.json()

                            if (data.message) {
                                alert(data.message);
                                return
                            }

                        } else {

                            const response = await fetch(process.env.REACT_APP_URL_BACKEND + `/select/${params.id}`,{
                                method: 'GET',
                                headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                                },
                                mode: 'cors',
                            })
                            const data = await response.json()
                            if (data.message) {
                                alert(data.message);
                                return
                            }

                            const responseDeleteIMG = await fetch(process.env.REACT_APP_URL_BACKEND + '/deleteImgHotel', {
                                method: "POST",
                                body: JSON.stringify({ "nameImg": data.src_imagen }),
                                headers: { "Content-Type": "application/json" },
                                mode: 'cors',
                            })
                            const dataIMG = responseDeleteIMG.json()
                            if (dataIMG.message) {
                                alert(dataIMG.message);
                                return
                            }

                            const responseUpdate = await fetch(process.env.REACT_APP_URL_BACKEND + `/crud/${params.id}`, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(InformationU),
                                mode: 'cors',
                            });
                            const dataUpdate = await responseUpdate.json()

                            if (dataUpdate.message) {
                                alert(dataUpdate.message);
                                return
                            }

                            const formdata = new FormData()
                            formdata.append('imagen_hotel', Image)
                            const responseIMG = await fetch(process.env.REACT_APP_URL_BACKEND + '/guardar_imagen_hotel', {
                                method: 'POST',
                                body: formdata,
                                mode: 'cors',
                            })
                            const dataIMGSave = await responseIMG.json()

                            if (dataIMGSave.message) {
                                alert(dataIMGSave.message);
                                return
                            }
                            setImage(null)

                            setCurrentIMG(dataUpdate.src_imagen);
                        }

                    } else {

                        const response = await fetch(process.env.REACT_APP_URL_BACKEND + '/crud', {
                            method: 'POST',
                            body: JSON.stringify(InformationU),
                            headers: { "Content-Type": "application/json" },
                            mode: 'cors',
                        });
                        const data = await response.json()
                        if (data.message) {
                            alert(data.message);
                            return
                        }


                        const formdata = new FormData()
                        formdata.append('imagen_hotel', Image)
                        const responseIMG = await fetch(process.env.REACT_APP_URL_BACKEND + '/guardar_imagen_hotel', {
                            method: 'POST',
                            body: formdata,
                            mode: 'cors',
                        })
                        const dataIMG = await responseIMG.json()
                        if (dataIMG.message) {
                            alert(dataIMG.message);
                            return
                        }

                        navigate(`/consultar_hoteles`)
                    }
                    setLoading(false)
                } else {
                    alert("Las coordenadas no tienen el formato correcto");
                }
            } else {
                alert("El nombre del hotel no es valido");
            }
        } else {
            alert("El telefono no es valido");
        }
    };

    const getImage = e => {
        setInformationU({ ...InformationU, [e.target.name]: e.target.files[0].name })
        setImage(e.target.files[0]);
    }

    const handleChange = e => {
        setInformationU({ ...InformationU, [e.target.name]: e.target.value })
    }

    const loadHotel = async (id) => {
        const response = await fetch(process.env.REACT_APP_URL_BACKEND + `/select/${id}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            mode: 'cors',
        })
        const data = await response.json()
        if (data.message) {
            alert(data.message);
            return
        }
        setInformationU(data);
        setCurrentIMG(data.src_imagen);
        setEditing(true);
    }

    useEffect(() => {
        if (params.id) {
            loadHotel(params.id);
        }
    }, [params.id])

    return (
        <div className='relative'>
            <div className='absolute top-2 right-2'>
                <img onClick={() => navigate(`/consultar_hoteles`)} className="w-7 pointer" loading="lazy" src={icon} alt="icon" />
            </div>
            <div className={editing === true ? 'flex flex-row justify-center items-center gap-x-5' : 'flex justify-center'}>
                <form className='bg-[#f7f2f2] rounded-3xl border shadow-lg w-[540px] h-[460px] my-10' onSubmit={handleSubmit}>

                    <div className='flex flex-col items-center mt-6'>
                        <div className='mb-2'>
                            <p>Coordenadas del hotel</p>
                        </div>
                        <div className='flex gap-x-10 gap-y-5'>
                            <div className='w-48'>
                                <TextField onChange={handleChange} name="latitud" id="standard-basic" label="Latitud de la ubicación" size="small" variant="standard" value={InformationU.latitud} />
                            </div>

                            <div className='w-48'>
                                <TextField onChange={handleChange} name="longitud" id="standard-basic" label="Longitud de la ubicación" size="small" variant="standard" value={InformationU.longitud} />
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col items-center mt-6'>
                        <div className=''>
                            <p>Información del hotel</p>
                        </div>
                        <div className='flex flex-row flex-wrap justify-center gap-x-10'>
                            <div className='w-48 my-2'>
                                <TextField onChange={handleChange} name="nombre_h" id="standard-basic" label="Nombre del hotel" size="small" variant="standard" value={InformationU.nombre_h} />
                            </div>

                            <div className='w-48 my-2'>
                                <TextField onChange={handleChange} name="direccion_h" id="standard-basic" label="Dirección del hotel" size="small" variant="standard" value={InformationU.direccion_h} />
                            </div>

                            <div className='w-48 my-2'>
                                <TextField onChange={handleChange} name="telefono_h" id="standard-basic" label="Telefono del hotel" size="small" variant="standard" value={InformationU.telefono_h} />
                            </div>

                            <div className='w-48 my-2'>
                                <Autocomplete
                                    options={zones}
                                    value={InformationU.fk_areaaca ? zones[4] : zones[InformationU.fk_areaaca - 1]}
                                    onChange={(event, newValue) => { setInformationU({ ...InformationU, fk_areaaca: zones.indexOf(newValue) + 1 }) }}
                                    id="auto-complete"
                                    autoComplete
                                    autoSelect
                                    includeInputInList
                                    renderInput={(params) => (
                                        <TextField {...params} label="Zona del hotel" variant="standard" />
                                    )}
                                />
                            </div>

                            <div className='text-center'>
                                <p className='my-4'>Imagen del hotel</p>
                                <input id="imagen_hotel" type="file" name="src_imagen" accept=".jpg, .png, .webp, .avif, .jpeg" onChange={getImage} />
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-center items-center mt-7'>
                        <Tooltip title={!InformationU.latitud || !InformationU.longitud || !InformationU.nombre_h || !InformationU.telefono_h || !InformationU.src_imagen || InformationU.fk_areaaca == 5 || !InformationU.direccion_h ? "Ingrese toda la información para activar el botón" : "Información completa"} placement="top">
                            <div>
                                <Button variant="contained" size='medium' type='submit' disabled={!InformationU.latitud || !InformationU.longitud || !InformationU.nombre_h || !InformationU.telefono_h || !InformationU.src_imagen || InformationU.fk_areaaca == 5 || !InformationU.direccion_h}>
                                    {loading ?
                                        (<CircularProgress color='inherit' size={24} disabled />)
                                        :
                                        (
                                            editing ? "Actualizar" : "Agregar"
                                        )
                                    }
                                </Button>
                            </div>
                        </Tooltip>
                    </div>

                </form>
                {
                    editing === true && (
                        <div className=''>
                            <MyMiniMap Style="MiniMap" Ubications={[
                                {
                                    "latitud": expresiones.latitud.test(InformationU.latitud) ? InformationU.latitud : 0,
                                    "longitud": expresiones.longitud.test(InformationU.longitud) ? InformationU.longitud : 0,
                                    "nombre_h": InformationU.nombre_h,
                                    "direccion_h": InformationU.direccion_h,
                                    "telefono_h": InformationU.telefono_h,
                                    "src_imagen": CurrentImg
                                }
                            ]} />
                        </div>)
                }
            </div>
        </div>
    )
}
