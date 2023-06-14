const pool = require('../cn');
const fs = require('fs')
const path = require('path');
const multer = require('multer');

const ValidateAccount = async (req, res, next) => {
    try {
        const { name, pass } = req.params
        const result = await pool.query('select * from AdminAccount where userName = $1 and userPassword = $2', [name, pass])
        
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Usuario o contraseña incorrecto",
            });

        res.status(200).json(result.rows[0]);

    } catch (error) {
        next(error);
    }
}

//Metodos del CRUD de los hoteles
const diskstorageHimg = multer.diskStorage({
    destination: path.join(__dirname, '../images/img_Hotels'),
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const fileUploadHotel = multer({ storage: diskstorageHimg }).single('imagen_hotel')

const getUbications = async (req, res, next) => {
    try {
        const ubications = await pool.query('select * from HotelsLocation');

        if (ubications.rows.length === 0)
            return res.status(404).json({
                message: 'Ubicaciones no encontradas',
            });


        res.status(200).json(ubications.rows);
    } catch (error) {
        next(error);
    }
}
//throw new Error('hola')
const getUbication = async (req, res, next) => {
    try {
        const { hotel } = req.params
        const result = await pool.query('select * from HotelsLocation where nombre_h = $1', [hotel])

        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Hotel no encontrado",
            });

        res.status(200).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}


const getIDHotel = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await pool.query('select * from HotelsLocation where ID_Locacion = $1', [id])

        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Hotel no encontrado",
            });

        res.status(200).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const InsertUbication = async (req, res, next) => {
    try {
        const { latitud, longitud, nombre_h, direccion_h, telefono_h, src_imagen, fk_areaaca } = req.body;
        const result = await pool.query('INSERT INTO HotelsLocation (latitud, longitud, nombre_h, direccion_h,telefono_h,src_imagen,fk_areaaca) VALUES ($1,$2,$3,$4,$5,$6,$7) returning *',
            [latitud, longitud, nombre_h, direccion_h, telefono_h, src_imagen, fk_areaaca]);

        if (result.rows.length === 0)
            return res.status(400).json({
                message: "No se inserto la ubicacion del hotel",
            });

        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const DeleteUbication = async (req, res, next) => {
    try {
        const { NombreH } = req.params
        const result = await pool.query('delete from HotelsLocation where nombre_h = $1', [NombreH])

        if (result.rows.length === 0) {
            return res.status(200).json({ status: 'OK' })
        }

        return res.status(404).json({
            message: "Registro no encontrado, no se pudo eliminar la ubicacion del hotel",
        });
    } catch (error) {
        next(error);
    }
}

const Path_imgHotel = path.join(__dirname, '..', 'images/img_Hotels')
const DeleteImgHotel = (req, res, next) => {
    try {
        const { nameImg } = req.body
        if (nameImg == "noimage.png") {
            return res.status(201).json({ status: 'OK' })
        } else {
            fs.unlink(path.join(Path_imgHotel, nameImg), (err) => {
                if (err) {
                    return res.status(400).json({ message: 'No se pudo borrar la imagen del hotel' })
                } else {
                    return res.status(201).json({ status: 'OK' })
                }
            })
        }
    } catch (error) {
        next(error);
    }
}


const UpdateUbication = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { latitud, longitud, nombre_h, direccion_h, telefono_h, src_imagen, fk_areaaca } = req.body;

        const result = await pool.query(
            "update HotelsLocation set latitud = $1, longitud = $2, nombre_h = $3, direccion_h = $4, telefono_h = $5, src_imagen = $6, fk_areaaca = $7 where ID_Locacion = $8 returning *",
            [latitud, longitud, nombre_h, direccion_h, telefono_h, src_imagen, fk_areaaca, id]);

        if (result.rows.length === 0)
            return res.status(400).json({
                message: 'No se pudo actualizar la ubicacion del hotel',
            });

        return res.status(201).json(result.rows[0])

    } catch (error) {
        next(error);
    }
}


//Metodos del CRUD de los articulos
const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../images/img_Articles'),
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const fileUpload = multer({ storage: diskstorage }).single('imagen_articulo')

const disk_storageImgs = multer.diskStorage({
    destination: path.join(__dirname, '../images/imgs_ArticleInformation'),
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const filesUpload = multer({ storage: disk_storageImgs }).single('imagenes_infoarticulo')


const getArticulosSec = async (req, res, next) => {
    try {
        const articulos = await pool.query('select * from Sectur_Articulos');

        if (articulos.rows.length === 0)
            return res.status(404).json({
                message: 'Articulos no encontrados',
            });

        return res.status(200).json(articulos.rows);
    } catch (error) {
        next(error);
    }
}

const getArticuloSec = async (req, res, next) => {
    try {
        const { idArt } = req.params
        let result = await pool.query('select * from Sectur_Articulos where ID_Articulo = $1', [idArt])

        if (result.rows.length === 0)
            return res.status(404).json({
                message: 'Articulo no encontrado',
            });

        return res.status(200).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const getInformacionArt = async (req, res, next) => {
    try {
        const { idArticulo } = req.params
        let result = await pool.query('select * from Informacion_Articulos where FK_Articulo = $1', [idArticulo])

        if (result.rows.length === 0)
            return res.status(404).json({
                message: 'Informacion del articulo no encontrada',
            });

        return res.status(200).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const getImagenesArticulo = async (req, res, next) => {
    try {
        const { fkArticulo } = req.params
        let result = await pool.query('select * from Imagenes_Articulos where FK_InformacionArt = $1', [fkArticulo])

        if (result.rows.length === 0)
            return res.status(404).json({
                message: 'Nombre de imagenes no encontradas',
            });

        res.status(200).json(result.rows);

    } catch (error) {
        next(error);
    }
}


const InsertArticuloSec = async (req, res, next) => {
    try {
        const { titulo_Articulo, imagen_Articulo } = req.body;
        const Articulo = await pool.query('INSERT INTO Sectur_Articulos (Titulo_Articulo, Imagen_Articulo) VALUES ($1, $2) returning *',
            [titulo_Articulo, imagen_Articulo]);

        if (Articulo.rows.length === 0)
            return res.status(400).json({
                message: 'No se inserto el articulo',
            });

        res.status(201).json(Articulo.rows[0]);
    } catch (error) {
        next(error);
    }
}

const InsertInformacionArt = async (req, res, next) => {
    try {
        const { FK_Articulo, Titulo_Articulo, Subtitulo_Articulo, Puntos_Articulo, Informacion_Articulo } = req.body;
        const infoArt = await pool.query('INSERT INTO Informacion_Articulos (FK_Articulo, Titulo_Articulo, Subtitulo_Articulo, Puntos_Articulo, Informacion_Articulo) VALUES ($1, $2, $3, $4, $5) returning *',
            [FK_Articulo, Titulo_Articulo, Subtitulo_Articulo, Puntos_Articulo, Informacion_Articulo]);

        if (infoArt.rows.length === 0)
            return res.status(400).json({
                message: 'No se inserto la informacion del registro',
            });

        return res.status(201).json(infoArt.rows[0]);
    } catch (error) {
        next(error);
    }
}

const InsertImagenesArt = async (req, res, next) => {
    try {
        const { FK_InformacionArt, Imagen_Articulo } = req.body;
        const img = await pool.query('INSERT INTO Imagenes_Articulos (FK_InformacionArt, Imagen_Articulo) VALUES ($1, $2) returning *',
            [FK_InformacionArt, Imagen_Articulo]);

        if (img.rows.length === 0)
            return res.status(400).json({
                message: 'No se inserto la imagen',
            });

        return res.status(201).json({ status: 'OK' })
    } catch (error) {
        next(error);
    }
}

const Path_imgArticulo = path.join(__dirname, '..', 'images/img_Articles')
const DeleteImgArticle = (req, res, next) => {
    try {
        const { nameImg } = req.body
        if (nameImg == "noimage.png") {
            return res.status(201).json({ status: 'OK' })
        } else {
            fs.unlink(path.join(Path_imgArticulo, nameImg), (err) => {
                if (err) {
                    return res.status(400).json({
                        message: 'No se pudo borrar la imagen del articulo'
                    })
                } else {
                    return res.status(201).json({ status: 'OK' })
                }
            })
        }
    } catch (error) {
        next(error);
    }
}

const Path_imgInfoArticulo = path.join(__dirname, '..', 'images/imgs_ArticleInformation')
const DeleteInfoArticle = async (req, res, next) => {
    try {
        const { nameImg } = req.body
        if (nameImg == "noimage.png") {
            return res.status(201).json({ status: 'OK' })
        } else {
            fs.unlink(path.join(Path_imgInfoArticulo, nameImg), (err) => {
                if (err) {
                    return res.status(400).json({
                        message: 'No se pudo borrar la imagen del articulo'
                    })
                } else {
                    return res.status(201).json({ status: 'OK' })
                }
            })
        }
    } catch (error) {
        next(error);
    }
}

const DeleteIMGinfo = async (req, res, next) => {
    try {
        const { FK_InforArt } = req.params
        const result = await pool.query('delete from Imagenes_Articulos where FK_InformacionArt = $1', [FK_InforArt])

        if (result.rows.length === 0) {
            return res.status(200).json({ status: 'OK' })
        }

        return res.status(404).json({
            message: "Registro no encontrado, no se pudo eliminar"
        });
    } catch (error) {
        next(error);
    }
}

const DeleteInformacionArt = async (req, res, next) => {
    try {
        const { ID_Articulo } = req.params
        const result = await pool.query('delete from Informacion_Articulos where FK_Articulo = $1', [ID_Articulo])

        if (result.rows.length === 0) {
            return res.status(200).json({ status: 'OK' })
        }

        return res.status(404).json({
            message: 'Registro no encontrado, no se pudo eliminar'
        });
    } catch (error) {
        next(error);
    }
}

const DeleteArticulo = async (req, res, next) => {
    try {
        const { ID_Arti } = req.params
        const result = await pool.query('delete from Sectur_Articulos where ID_Articulo = $1', [ID_Arti])

        if (result.rows.length === 0) {
            return res.status(200).json({ status: 'OK' })
        }

        return res.status(404).json({
            message: 'Registro no encontrado, no se pudo eliminar'
        });
    } catch (error) {
        next(error);
    }
}

const UpdateArticle = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { titulo_Articulo, imagen_Articulo } = req.body;

        const result = await pool.query(
            "update Sectur_Articulos set Titulo_Articulo = $1, Imagen_Articulo = $2 where ID_Articulo = $3 returning *",
            [titulo_Articulo, imagen_Articulo, id]);

        if (result.rows.length === 0)
            return res.status(400).json({
                message: 'No se pudo actualizar el articulo',
            });

        return res.status(201).json(result.rows[0])
    } catch (error) {
        next(error);
    }
}

const UpdateInformationArt = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { FK_Articulo, Titulo_Articulo, Subtitulo_Articulo, Puntos_Articulo, Informacion_Articulo } = req.body;

        const result = await pool.query(
            "update Informacion_Articulos set Titulo_Articulo = $1, Subtitulo_Articulo = $2, Puntos_Articulo = $3, Informacion_Articulo = $4 where FK_Articulo = $5 returning *",
            [Titulo_Articulo, Subtitulo_Articulo, Puntos_Articulo, Informacion_Articulo, id]);

        if (result.rows.length === 0)
            return res.status(400).json({
                message: 'No se pudo actualizar la informacion del articulo',
            });

        return res.status(201).json(result.rows[0])
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUbications,
    getUbication,
    fileUploadHotel,
    InsertUbication,
    DeleteUbication,
    DeleteImgHotel,
    UpdateUbication,
    getIDHotel,
    ValidateAccount,

    filesUpload,
    fileUpload,
    getArticulosSec,
    getImagenesArticulo,
    getInformacionArt,
    getArticuloSec,
    InsertInformacionArt,
    InsertImagenesArt,
    InsertArticuloSec,
    DeleteImgArticle,
    DeleteInfoArticle,
    DeleteIMGinfo,
    DeleteInformacionArt,
    DeleteArticulo,
    UpdateArticle,
    UpdateInformationArt
}