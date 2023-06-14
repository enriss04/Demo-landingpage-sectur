import { Marker, Popup, useMapEvents } from 'react-leaflet'
import { IconLocation } from './IconLocation'
import '../../../styles/stylesMap/markers.css'
import phone from "../../../assets/assetsMap/icons/phone.svg"
import ubication from "../../../assets/assetsMap/icons/direcction.svg"

export const Markers = ({ informacion }) => {
  const map = useMapEvents({})

  return (
    <>
      {informacion.length > 0 &&
        (<>
          {
            informacion.map((info, index) => {
              return (
                <Marker key={index} position={{ lat: info.latitud, lng: info.longitud }} icon={IconLocation} eventHandlers={{
                  click: (e) => {
                    map.locate()                    
                    map.flyTo([(e.latlng.lat + 0.00122).toString(), e.latlng.lng.toString()], 18)
                  },
                }}>
                  <Popup>
                    <div className='ContainerInformation'>
                      <img loading="lazy" src={require = (process.env.REACT_APP_GET_IMG_HOTEL + info.src_imagen)} alt="imagen" className="ImageHotel" />
                      <div className='NombreHotel PageTitle2'>{info.nombre_h}</div>
                      <div className='flex'>
                        <img className="w-6" loading="lazy" src={ubication} alt="imagen" />
                        <div className='HotelInformation PageText1'>{info.direccion_h}</div>
                      </div>
                      <div className='flex mt-2'>
                        <img className="w-6" loading="lazy" src={phone} alt="imagen" />
                        <div className='HotelInformation PageText1'>{info.telefono_h}</div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              )
            })
          }
        </>)
      }
    </>
  );
}

export default Markers