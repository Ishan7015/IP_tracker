let map_instance;
let marker_instance;
const zoomLvl = 10;

const createMap = (lat = 28, long = 77) => {

    let map = L.map('map').setView([lat, long], zoomLvl);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    let marker = L.marker([lat, long]).addTo(map);
    map_instance = map;
    marker_instance = marker;
}

export const recenter = (lat, long) => {
    map_instance.setView([lat, long], zoomLvl);
}

export const updateMap = (lat, long) => {
    map_instance.setView([lat, long], zoomLvl);
    marker_instance.setLatLng(L.latLng(lat, long));
}

export default createMap;