import { useState, useEffect } from 'react'
import { Button, TextField, Tooltip } from '@mui/material'
import Card from "../../../../components/main/CardArticulos"
import { useNavigate, useParams } from 'react-router-dom'
import icon from '../../../../assets/assetsMap/icons/close.svg'

export default function InsertUpdate() {
    const params = useParams();
    const navigate = useNavigate()

    const [InformationForm, setInfoForm] = useState(false);
    const [ArticleForm, setArtForm] = useState(true);

    const [editing, setEditing] = useState(false);
    const [banderaArt, setBandera] = useState(false);
    const [banderaInfo, setBanderaInfo] = useState(false);
    const [StatusArticulo, setStatusArticulo] = useState(false);
    const [StatusInformacion, setStatusInformacion] = useState(true);

    const [Image, setImage] = useState(null);
    const [Articulo, setArticulo] = useState({
        titulo_Articulo: '',
        imagen_Articulo: ''
    });
    const [ShowArticulo, setShowArticulo] = useState({
        titulo_Articulo: '',
        imagen_Articulo: 'noimage.png'
    });

    const [Images, setImages] = useState(null);
    const [Information, setInformation] = useState({
        FK_Articulo: 0,
        Titulo_Articulo: '',
        Subtitulo_Articulo: '',
        Puntos_Articulo: '',
        Informacion_Articulo: ''
    });
    const [ShowInformation, setShowInformation] = useState({
        Titulo_Articulo: '',
        Subtitulo_Articulo: '',
        Puntos_Articulo: '',
        Informacion_Articulo: ''
    });
    const [IMGsName, setIMGsname] = useState([{
        imagen_articulo: 'noimage.png'
    }]);

    const getInfoImage = e => {
        setArticulo({ ...Articulo, [e.target.name]: e.target.files[0].name })
        setImage(e.target.files[0]);
    }
    const getTitleArt = e => {
        setArticulo({ ...Articulo, [e.target.name]: e.target.value })
    }
    const getInfoArt = e => {
        setInformation({ ...Information, [e.target.name]: e.target.value })
    }
    const getImages = e => {
        setImages(e.target.files);
    }


    const NextForm = () => {
        if (StatusArticulo) {
            setArtForm(false);
            setInfoForm(true);
        } else {
            navigate(`/consultar_articulos`);
        }

    }

    const ValidateArticle = () => {
        if (!editing) {
            if (!Image) {
                alert('No has seleccionado ninguna imagen');
                return
            }
        }

        if (Articulo.titulo_Articulo === '') {
            alert('No has escrito el titulo del articulo');
            return
        }

        if (editing) {
            UpdateArticle();
        } else {
            InsertArticle();
        }
        setBandera(true);
    }

    const loadArticulo = async (id) => {
        const responseArticulo = await fetch(process.env.REACT_APP_URL_BACKEND + `/consulta_articulo/${id}`,{
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            mode: 'cors',
        })
        const dataArticulo = await responseArticulo.json();

        if (dataArticulo.message) {
            alert(dataArticulo.message);
            return
        }
        setArticulo({
            titulo_Articulo: dataArticulo.titulo_articulo,
            imagen_Articulo: dataArticulo.imagen_articulo
        });

        setShowArticulo({
            titulo_Articulo: dataArticulo.titulo_articulo,
            imagen_Articulo: dataArticulo.imagen_articulo
        })

        const responseInformacionArt = await fetch(process.env.REACT_APP_URL_BACKEND + `/informacion_articulo/${id}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            mode: 'cors',
        })
        const dataInformacionArt = await responseInformacionArt.json()

        if (dataInformacionArt.message) {
            alert(dataInformacionArt.message);
            return
        }
        setInformation({
            FK_Articulo: dataInformacionArt.fk_articulo,
            Titulo_Articulo: dataInformacionArt.titulo_articulo,
            Subtitulo_Articulo: dataInformacionArt.subtitulo_articulo,
            Puntos_Articulo: dataInformacionArt.puntos_articulo,
            Informacion_Articulo: dataInformacionArt.informacion_articulo
        })
        setShowInformation({
            Titulo_Articulo: dataInformacionArt.titulo_articulo,
            Subtitulo_Articulo: dataInformacionArt.subtitulo_articulo,
            Puntos_Articulo: dataInformacionArt.puntos_articulo,
            Informacion_Articulo: dataInformacionArt.informacion_articulo
        });

        const respon = await fetch(process.env.REACT_APP_URL_BACKEND + `/imagenes_articulo/${dataInformacionArt.id_informacionart}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            mode: 'cors',
        })
        const InfoIMG = await respon.json()

        if (InfoIMG.message) {
            alert(InfoIMG.message);
            return
        }
        setIMGsname(InfoIMG)

        setEditing(true)
    }

    const InsertArticle = async (e) => {
        const response = await fetch(process.env.REACT_APP_URL_BACKEND + '/agregar_articulo', {
            method: 'POST',
            body: JSON.stringify(Articulo),
            headers: { "Content-Type": "application/json" },
            mode: 'cors',
        });
        const data = await response.json()

        if (data.message) {
            alert(data.message);
            return
        }

        const formdata = new FormData();
        formdata.append('imagen_articulo', Image);
        console.log(formdata);
        const IMGsave = await fetch(process.env.REACT_APP_URL_BACKEND + '/guardar_imagen_articulo', {
            method: 'POST',
            body: formdata,
            mode: 'cors',
        })
        const dataIMG = await IMGsave.json()

        if (dataIMG.message) {
            alert(dataIMG.message);
            return
        }

        setImage(null)

        setShowArticulo({
            titulo_Articulo: data.titulo_articulo,
            imagen_Articulo: data.imagen_articulo
        })

        setInformation({
            FK_Articulo: data.id_articulo,
            Titulo_Articulo: '',
            Subtitulo_Articulo: '',
            Puntos_Articulo: '',
            Informacion_Articulo: ''
        });

        setStatusArticulo(true);
    }

    const UpdateArticle = async (e) => {
        if (Image === null) {
            const response = await fetch(process.env.REACT_APP_URL_BACKEND + `/actualizar_Articulo/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Articulo),
                mode: 'cors',
            });
            const data = await response.json()

            if (data.message) {
                alert(data.message);
                return
            }

            setShowArticulo({
                titulo_Articulo: data.titulo_articulo,
                imagen_Articulo: data.imagen_articulo
            })

            setStatusArticulo(true);

        } else {
            const responseArt = await fetch(process.env.REACT_APP_URL_BACKEND + `/consulta_articulo/${params.id}`, {
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

            const IMGDeleted = await fetch(process.env.REACT_APP_URL_BACKEND + '/deleteImgArticulo', {
                method: "POST",
                body: JSON.stringify({ "nameImg": ArticuloSec.imagen_articulo }),
                headers: { "Content-Type": "application/json" },
                mode: 'cors',
            })
            const dataIMGdelete = await IMGDeleted.json()

            if (dataIMGdelete.message) {
                alert(dataIMGdelete.message);
                return
            }

            const formdata = new FormData();
            formdata.append('imagen_articulo', Image);
            const IMGsave = await fetch(process.env.REACT_APP_URL_BACKEND + '/guardar_imagen_articulo', {
                method: 'POST',
                body: formdata,
                mode: 'cors',
            })
            const dataIMGsave = await IMGsave.json()

            if (dataIMGsave.message) {
                alert(dataIMGsave.message);
                return
            }

            setImage(null)

            const UpdateArticulo = await fetch(process.env.REACT_APP_URL_BACKEND + `/actualizar_Articulo/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Articulo),
                mode: 'cors',
            });
            const dataUpdateArt = await UpdateArticulo.json()

            if (dataUpdateArt.message) {
                alert(dataUpdateArt.message);
                return
            }

            setShowArticulo({
                titulo_Articulo: dataUpdateArt.titulo_articulo,
                imagen_Articulo: dataUpdateArt.imagen_articulo
            })

            setStatusArticulo(true);
        }
    }

    const ValidateInfoArti = async (e) => {
        if (editing) {
            UpdateInformationArt();
        } else {
            for (let index = 0; index < Images.length; index++) {
                const formdata = new FormData()
                formdata.append('imagenes_infoarticulo', Images[index])
                const IMGsave = await fetch(process.env.REACT_APP_URL_BACKEND + '/guardar_imagenes_articulo', {
                    method: 'POST',
                    body: formdata,
                    mode: 'cors',
                })
                const dataIMGsave = await IMGsave.json()

                if (dataIMGsave.message) {
                    setStatusInformacion(false);
                    alert(dataIMGsave.message);
                    return
                }
            }
            if (StatusInformacion) {
                InsertInformationArt();
            }
        }

        if (StatusInformacion) {
            setBanderaInfo(true);
        }
    }

    const InsertInformationArt = async (e) => {
        const response = await fetch(process.env.REACT_APP_URL_BACKEND + '/agregar_informacionArt', {
            method: 'POST',
            body: JSON.stringify(Information),
            headers: { "Content-Type": "application/json" },
            mode: 'cors',
        });
        const data = await response.json();

        if (data.message) {
            alert(data.message);
            return
        }

        setShowInformation({
            Titulo_Articulo: data.titulo_articulo,
            Subtitulo_Articulo: data.subtitulo_articulo,
            Puntos_Articulo: data.puntos_articulo,
            Informacion_Articulo: data.informacion_articulo
        });

        for (let index = 0; index < Images.length; index++) {
            const NameIMG = await fetch(process.env.REACT_APP_URL_BACKEND + '/agregar_imagenesArt', {
                method: 'POST',
                body: JSON.stringify({
                    FK_InformacionArt: data.id_informacionart,
                    Imagen_Articulo: Images[index].name
                }),
                headers: { "Content-Type": "application/json" },
                mode: 'cors',
            });
            const dataIMG = await NameIMG.json();

            if (dataIMG.message) {
                setStatusInformacion(false);
                alert(dataIMG.message);
                return
            }
        }

        const respon = await fetch(process.env.REACT_APP_URL_BACKEND + `/imagenes_articulo/${data.id_informacionart}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors',
        })
        const InfoIMG = await respon.json()

        if (InfoIMG.message) {
            alert(InfoIMG.message);
            return
        }
        setIMGsname(InfoIMG)

    }


    const UpdateInformationArt = async (e) => {
        if (Images === null) {
            const ResponseArt = await fetch(process.env.REACT_APP_URL_BACKEND + `/actualizar_informacionArt/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Information),
                mode: 'cors',
            });
            const dataInfo = await ResponseArt.json();

            if (dataInfo.message) {
                alert(dataInfo.message);
                return
            }

            setShowInformation({
                Titulo_Articulo: dataInfo.titulo_articulo,
                Subtitulo_Articulo: dataInfo.subtitulo_articulo,
                Puntos_Articulo: dataInfo.puntos_articulo,
                Informacion_Articulo: dataInfo.informacion_articulo
            });

        } else {

            const response = await fetch(process.env.REACT_APP_URL_BACKEND + `/informacion_articulo/${params.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                mode: 'cors',
            })
            const Informacion = await response.json()

            if (Informacion.message) {
                alert(Informacion.message);
                return
            }

            const responseIMGs = await fetch(process.env.REACT_APP_URL_BACKEND + `/imagenes_articulo/${Informacion.id_informacionart}`, {
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
                const IMG = await fetch(process.env.REACT_APP_URL_BACKEND + '/deleteImgInformacion', {
                    method: "POST",
                    body: JSON.stringify({ "nameImg": InformacionIMGs[index].imagen_articulo }),
                    headers: { "Content-Type": "application/json" },
                    mode: 'cors',
                })
                const dataIMG = await IMG.json();

                if (dataIMG.message) {
                    setStatusInformacion(false);
                    alert(dataIMG.message);
                    return
                }
            }

            if (StatusInformacion) {
                const IMG_BD = await fetch(process.env.REACT_APP_URL_BACKEND + `/eliminarIMGinfo/${Informacion.id_informacionart}`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    mode: 'cors',

                })
                const dataIMG_BD = await IMG_BD.json();

                if (dataIMG_BD.message) {
                    alert(dataIMG_BD.message);
                    return
                }

                for (let index = 0; index < Images.length; index++) {
                    const formdata = new FormData()
                    formdata.append('imagenes_infoarticulo', Images[index])
                    const IMGsave = await fetch(process.env.REACT_APP_URL_BACKEND + '/guardar_imagenes_articulo', {
                        method: 'POST',
                        body: formdata,
                        mode: 'cors',
                    })
                    const dataIMGsave = await IMGsave.json();

                    if (dataIMGsave.message) {
                        setStatusInformacion(false);
                        alert(dataIMGsave.message);
                        return
                    }
                }

                if (StatusInformacion) {
                    for (let index = 0; index < Images.length; index++) {
                        const NameIMG = await fetch(process.env.REACT_APP_URL_BACKEND + '/agregar_imagenesArt', {
                            method: 'POST',
                            body: JSON.stringify({
                                FK_InformacionArt: Informacion.id_informacionart,
                                Imagen_Articulo: Images[index].name
                            }),
                            headers: { "Content-Type": "application/json" },
                            mode: 'cors',
                        });
                        const dataIMG = await NameIMG.json();

                        if (dataIMG.message) {
                            setStatusInformacion(false);
                            alert(dataIMG.message);
                            return
                        }
                    }

                    if (StatusInformacion) {
                        const responseArti = await fetch(process.env.REACT_APP_URL_BACKEND + `/actualizar_informacionArt/${params.id}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(Information),
                            mode: 'cors',
                        });

                        const dataUpdateArti = await responseArti.json();

                        if (dataUpdateArti.message) {
                            alert(dataUpdateArti.message);
                            return
                        }

                        setShowInformation({
                            Titulo_Articulo: dataUpdateArti.titulo_articulo,
                            Subtitulo_Articulo: dataUpdateArti.subtitulo_articulo,
                            Puntos_Articulo: dataUpdateArti.puntos_articulo,
                            Informacion_Articulo: dataUpdateArti.informacion_articulo
                        });

                        const respon = await fetch(process.env.REACT_APP_URL_BACKEND + `/imagenes_articulo/${dataUpdateArti.id_informacionart}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            mode: 'cors',
                        })
                        const InfoIMG = await respon.json()

                        if (InfoIMG.message) {
                            alert(InfoIMG.message);
                            return
                        }
                        setIMGsname(InfoIMG)

                    }
                }
            }

        }
    }

    useEffect(() => {
        if (params.id) {
            loadArticulo(params.id);
        }
    }, [params.id])

    return (
        <div className='relative'>
            <div className='absolute top-2 right-2'>
                <img onClick={() => navigate(`/consultar_articulos`)} className="w-7 pointer" loading="lazy" src={icon} alt="icon" />
            </div>

            {
                ArticleForm && (
                    <div className='flex flex-row justify-center items-center gap-x-5'>
                        <div className='bg-[#f7f2f2] rounded-3xl border shadow-lg w-[540px] h-[280px] my-[150px]'>
                            <div className='flex flex-col items-center mt-6'>
                                <div className='w-[480px]'>
                                    <TextField
                                        id="outlined-textarea"
                                        label="Titulo del articulo"
                                        size="medium"
                                        multiline
                                        fullWidth
                                        rows={3}
                                        onChange={getTitleArt}
                                        name="titulo_Articulo"
                                        value={Articulo.titulo_Articulo}
                                    />
                                </div>
                            </div>

                            <div className='my-2 text-center'>
                                <p>Imagen del articulo</p>
                                <div className='my-5'>
                                    <input id="imagen" type="file" name="imagen_Articulo" accept=".jpg, .png, .webp, .avif, .jpeg" onChange={getInfoImage} />
                                </div>
                            </div>

                            <div className="flex justify-center items-center gap-x-4">
                                <Tooltip title={!Articulo.titulo_Articulo || !Articulo.imagen_Articulo ? "Ingrese toda la información para activar el botón" : "Información completa"} placement="top">
                                    <div>
                                        <Button variant="contained" disabled={banderaArt || !Articulo.titulo_Articulo || !Articulo.imagen_Articulo} onClick={ValidateArticle}>Aceptar</Button>
                                    </div>
                                </Tooltip>

                                <Button variant="contained" disabled={!StatusArticulo} onClick={NextForm}>Siguiente</Button>
                            </div>
                        </div>
                        <div className="flex justify-center items-center w-[50%]">
                            <Card img={ShowArticulo.imagen_Articulo} title={ShowArticulo.titulo_Articulo} />
                        </div>
                    </div>

                )
            }

            {
                InformationForm && (
                    <div className='flex flex-row justify-center items-center gap-x-5'>
                        <div className='bg-[#f7f2f2] rounded-3xl border shadow-lg w-[600px] h-[870px] my-10'>
                            <div className='flex flex-col items-center mt-6'>
                                <div className='mb-2'>
                                    <p>Información del articulo</p>
                                </div>
                                <div className="w-[570px] my-4">
                                    <TextField
                                        id="outlined-textarea"
                                        label="Titulo"
                                        multiline
                                        size="medium"
                                        fullWidth
                                        rows={3}
                                        onChange={getInfoArt}
                                        name="Titulo_Articulo"
                                        value={Information.Titulo_Articulo}
                                    />
                                </div>
                                <div className="w-[570px] my-4">
                                    <TextField
                                        id="outlined-textarea"
                                        label="Subtitulo"
                                        multiline
                                        rows={3}
                                        fullWidth
                                        size="medium"
                                        onChange={getInfoArt}
                                        name="Subtitulo_Articulo"
                                        value={Information.Subtitulo_Articulo}
                                    />
                                </div>
                                <div className="w-[570px] my-4">
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Información a resaltar"
                                        multiline
                                        fullWidth
                                        rows={6}
                                        onChange={getInfoArt}
                                        name="Puntos_Articulo"
                                        value={Information.Puntos_Articulo}
                                    />
                                </div>
                                <div className="w-[570px] my-4">
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Información general"
                                        multiline
                                        fullWidth
                                        rows={6}
                                        onChange={getInfoArt}
                                        name="Informacion_Articulo"
                                        value={Information.Informacion_Articulo}
                                    />
                                </div>
                            </div>


                            <div className='text-center'>
                                <p className='my-2'>Seleccione las imagenes del articulo</p>
                                <input type="file" accept=".jpg, .png, .webp, .avif, .jpeg" multiple onChange={getImages} />
                            </div>

                            <div className='flex justify-center items-center mt-5 gap-x-4'>
                                <Tooltip title={!Information.Titulo_Articulo || !Information.Subtitulo_Articulo || !Information.Puntos_Articulo || !Information.Informacion_Articulo ? "Ingrese toda la información para activar el botón" : "Información completa"} placement="top">
                                    <div>
                                        <Button variant="contained" disabled={banderaInfo || !Information.Titulo_Articulo || !Information.Subtitulo_Articulo || !Information.Puntos_Articulo || !Information.Informacion_Articulo} onClick={ValidateInfoArti}>Aceptar</Button>
                                    </div>
                                </Tooltip>
                                <Button variant="contained" disabled={params.id ? false : !banderaInfo} onClick={() => navigate(`/consultar_articulos`)}>Ir al inicio</Button>
                            </div>
                        </div>
                        <div className="flex justify-center items-center w-[50%]">
                            <div className="flex flex-col">
                                <div className='text-center my-10'>
                                    <p>{ShowInformation.Titulo_Articulo}</p>
                                    <p>{ShowInformation.Subtitulo_Articulo}</p>
                                    <p>{ShowInformation.Puntos_Articulo}</p>
                                    <p>{ShowInformation.Informacion_Articulo}</p>
                                </div>
                                <div className="flex flex-row flex-wrap w-full gap-x-7">
                                    {
                                        IMGsName.map((info, index) => {
                                            return (
                                                <div key={index}>
                                                    <img className="w-[150px] h-[170px]" src={require = (process.env.REACT_APP_GET_IMG_INFOARTICULO + info.imagen_articulo)} alt="Avatar" />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
