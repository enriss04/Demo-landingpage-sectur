const {Router} = require('express');
const {ValidateAccount,
    getUbications,fileUploadHotel,InsertUbication,DeleteUbication,UpdateUbication,getIDHotel,getUbication,DeleteImgHotel,
    fileUpload,filesUpload,getArticulosSec,InsertArticuloSec,getInformacionArt,getArticuloSec,InsertInformacionArt,InsertImagenesArt,getImagenesArticulo,
    DeleteImgArticle,DeleteInfoArticle,DeleteIMGinfo,DeleteInformacionArt,DeleteArticulo,UpdateArticle, UpdateInformationArt} = require('../controllers/task.cotroller');

const router = Router();

//validar inicio de sesion
router.get('/validate/:name,:pass', ValidateAccount)

//CRUD de los hoteles
router.post('/guardar_imagen_hotel', fileUploadHotel,(req, res) => {
    try {
        return res.status(202).json({ status: "OK"})
    } catch (error) {
        return res.status(406).json({ message: "No se cargo la imagen por lo siguiente: " + error })
   }
});

router.get('/crud', getUbications);

router.get('/select/:id', getIDHotel)

router.get('/select-hotel/:hotel', getUbication)

router.post('/crud', InsertUbication)

router.delete('/crud/:NombreH', DeleteUbication)

router.post('/deleteImgHotel', DeleteImgHotel)

router.put('/crud/:id', UpdateUbication)


//CRUD de los articulos

router.get('/consulta_articulos', getArticulosSec);

router.get('/consulta_articulo/:idArt', getArticuloSec)

router.get('/informacion_articulo/:idArticulo', getInformacionArt)

router.get('/imagenes_articulo/:fkArticulo', getImagenesArticulo)


router.post('/agregar_articulo',  InsertArticuloSec);

router.post('/agregar_informacionArt',  InsertInformacionArt);

router.post('/agregar_imagenesArt',  InsertImagenesArt);

router.post('/guardar_imagen_articulo', fileUpload,(req, res) => {
    try {
        return res.status(201).json({ status: 'OK'})
    } catch (error) {
        return res.status(406).json({ message: 'No se cargo la imagen por lo siguiente: ' + error })
   }
});

router.post('/guardar_imagenes_articulo', filesUpload,(req, res) => {
    try {
        return res.status(201).json({ status: 'OK'})
    } catch (error) {
        return res.status(406).json({ message: 'No se cargo la imagen por lo siguiente: ' + error })
   }
});

router.post('/deleteImgArticulo', DeleteImgArticle)

router.post('/deleteImgInformacion', DeleteInfoArticle)

router.delete('/eliminarIMGinfo/:FK_InforArt', DeleteIMGinfo)

router.delete('/eliminarInfo/:ID_Articulo', DeleteInformacionArt)

router.delete('/eliminarArt/:ID_Arti', DeleteArticulo)

router.put('/actualizar_Articulo/:id', UpdateArticle)

router.put('/actualizar_informacionArt/:id', UpdateInformationArt)


module.exports = router;