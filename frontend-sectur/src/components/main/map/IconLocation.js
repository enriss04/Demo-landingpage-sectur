import Location from 'leaflet';
import hotel from '../../../assets/assetsMap/ubication-icon/ubication.png';

export const IconLocation = Location.icon({
    iconUrl: hotel,
    iconRetinaUrl: hotel,
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [35,35],
    className: "leaflet-venue-icon",
});
