import { MapContainer, TileLayer} from 'react-leaflet';
import Markers from './Markers';
import '../../../styles/stylesMap/map.css'

const MapView = ({ Style, Ubications }) => {
      
    return (
        <div className={Style} >
            <MapContainer center={{ lat: '16.84477839135118', lng: '-99.87350399983222' }} zoom={11} scrollWheelZoom={false}>
                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                <Markers informacion={Ubications} />
            </MapContainer >
        </div >
    );

}

export default MapView