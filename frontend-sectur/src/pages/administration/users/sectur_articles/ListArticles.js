import { Button, TextField, Autocomplete, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import icon from '../../../../assets/assetsMap/icons/close.svg'
import SearchIcon from '@mui/icons-material/Search';

export default function ListArticles() {
    const navigate = useNavigate()

    const [value, setValue] = useState(null);
    const [Articulos, setArticulos] = useState([{
        id_articulo: null,
        titulo_articulo: '',
        imagen_articulo: 'noimage.png'
    }])

    const handleConfirm = (id) => {
        const confirmed = window.confirm("¿Estás seguro que deseas realizar esta acción?");
        if (confirmed) {
            DeleteArticle(id)
        }
    };

    const loadArticles = async () => {
        const response = await fetch(process.env.REACT_APP_URL_BACKEND + '/consulta_articulos', {
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
        setArticulos(data)
    }

    const DeleteArticle = async (ID_Article) => {
        const responseInfo = await fetch(process.env.REACT_APP_URL_BACKEND + `/informacion_articulo/${ID_Article}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors',
        })
        const InformacionArti = await responseInfo.json()

        if (InformacionArti.message) {
            alert(InformacionArti.message);
            return
        }

        const responseIMGs = await fetch(process.env.REACT_APP_URL_BACKEND + `/imagenes_articulo/${InformacionArti.id_informacionart}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors',
        })
        const InformacionIMGs = await responseIMGs.json()

        if (InformacionIMGs.message) {
            alert(InformacionIMGs.message);
            return
        }

        for (let index = 0; index < InformacionIMGs.length; index++) {
            const DeleteIMG = await fetch(process.env.REACT_APP_URL_BACKEND + '/deleteImgInformacion', {
                method: "POST",
                body: JSON.stringify({ "nameImg": InformacionIMGs[index].imagen_articulo }),
                headers: { "Content-Type": "application/json" },
                mode: 'cors',
            })
            const dataIMGdelete = DeleteIMG.json()

            if (dataIMGdelete.message) {
                alert(dataIMGdelete.message);
                return
            }
        }

        const IMG_DeleteBD = await fetch(process.env.REACT_APP_URL_BACKEND + `/eliminarIMGinfo/${InformacionArti.id_informacionart}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors',

        })
        const dataName_Delete = await IMG_DeleteBD.json()

        if (dataName_Delete.message) {
            alert(dataName_Delete.message);
            return
        }

        const InfoDelete = await fetch(process.env.REACT_APP_URL_BACKEND + `/eliminarInfo/${ID_Article}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors',
        })
        const dataDeleteInfo = await InfoDelete.json()

        if (dataDeleteInfo.message) {
            alert(dataDeleteInfo.message);
            return
        }

        const responseArt = await fetch(process.env.REACT_APP_URL_BACKEND + `/consulta_articulo/${ID_Article}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors',
        })
        const ArticuloSec = await responseArt.json()

        if (ArticuloSec.message) {
            alert(ArticuloSec.message);
            return
        }

        const IMG_File = await fetch(process.env.REACT_APP_URL_BACKEND + '/deleteImgArticulo', {
            method: "POST",
            body: JSON.stringify({ "nameImg": ArticuloSec.imagen_articulo }),
            headers: { "Content-Type": "application/json" },
            mode: 'cors',
        })
        const dataIMGFile = await IMG_File.json()

        if (dataIMGFile.message) {
            alert(dataIMGFile.message);
            return
        }

        const IMGArt_Delete = await fetch(process.env.REACT_APP_URL_BACKEND + `/eliminarArt/${ArticuloSec.id_articulo}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors',
        })
        const dataDeleteArticulo = await IMGArt_Delete.json()

        if (dataDeleteArticulo.message) {
            alert(dataDeleteArticulo.message);
            return
        }

        setArticulos(Articulos.filter(articulo => articulo.id_articulo !== ID_Article));
    }

    useEffect(() => {
        loadArticles()
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
        options: Articulos,
        getOptionLabel: (option) => option.titulo_articulo,
    };

    return (
        <div className='flex flex-row relative'>
            <div className='absolute top-2 right-2'>
                <img onClick={() => navigate(`/pagina_principal`)} className="w-7 pointer" loading="lazy" src={icon} alt="icon" />
            </div>

            <div className='w-[550px]'>
                <div className='fixed top-[30%] left-7 h-[270px] w-3/12 bg-[#E7D2AC] rounded-lg shadow-lg' id='SelectCard'>

                    <div className='ml-4 my-8'>
                        <p className='my-2 text-lg font-serif'>Agregar nuevo articulo</p>
                        <Button variant="contained" size='small' onClick={() => navigate(`/agregar_articulo`)}>Click</Button>
                    </div>

                    <div className='ml-4 my-7'>
                        <p className='my-2 text-lg font-serif'>Buscar articulo</p>
                        <div className='flex flex-row space-y-3 w-[300px]'>
                            <div className='w-96'>
                                <Autocomplete
                                    {...defaultProps}
                                    onChange={(event, newValue) => {
                                        {
                                            newValue === null ?
                                                setValue(null)
                                                :
                                                setValue("#" + newValue.titulo_articulo);
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

            <div className='flex flex-col w-full items-center gap-y-8  my-10'>
                {
                    Articulos.map((articulo) => (
                        <div className='flex flex-col bg-[#DFE4EA] rounded-3xl border shadow-md w-[750px] h-64' key={articulo.id_articulo} id={articulo.titulo_articulo}>
                            <div className='h-[80%] w-full'>
                                <div className='flex flex-row h-full'>
                                    <div className='flex justify-center items-center w-[38%]'>
                                        <img className="w-[240px] h-[180px] rounded-xl" loading="lazy" src={require = (process.env.REACT_APP_GET_IMG_ARTICULO + articulo.imagen_articulo)} alt="img_seccion" />
                                    </div>
                                    <div className='flex flex-col justify-center items-start gap-y-1 w-[62%]'>
                                        <p className=''>{articulo.titulo_articulo}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-center items-center gap-x-7 h-[20%]'>
                                <Button variant="contained" size='medium' onClick={() => navigate(`/actualizar_articulo/${articulo.id_articulo}`)}>Actualizar</Button>
                                <Button variant="contained" size='medium' onClick={() => handleConfirm(articulo.id_articulo)}>Eliminar</Button>
                            </div>
                        </div>
                    )
                    )
                }
            </div>

        </div>
    )
}
