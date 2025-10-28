import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

export const map = L.map("map").setView([50.061389, 19.938333], 12);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
