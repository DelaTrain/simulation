import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Station } from "./core/station";
import { Position } from "./utils/position";
import { Rail } from "./core/rail";
import { Train, TrainDirection, TrainPosition, TrainCategory } from "./core/train";
import { simulation } from "./core/simulation";

export const stationIcon = L.divIcon({ className: "station-icon" });

export const map = L.map("map").setView([50.061389, 19.938333], 12);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

export const displayStation = (station: Station) => {
    const marker = L.marker(station.position.toArray(), {
        icon: stationIcon,
        title: station.name,
        alt: station.name,
    }).addTo(map);
    marker.bindPopup(`<b>${station.name}</b>`).openPopup();
};

export const displayRail = (rail: Rail) => {
    const latlngs = rail.allPositions().map((pos) => pos.toArray());
    const polyline = L.polyline(latlngs, { color: "blue" }).addTo(map);
    return polyline;
};

export const displayTrain = (train: Train) => {
    const marker = L.marker(train.position.calculatePosition().toArray()).addTo(map);
    marker.setIcon(L.icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/565/565410.png", iconSize: [32, 32] }));
    marker.bindPopup(`<b>${train.displayName()}</b>`).openPopup();
    return marker;
};

// const rails: Rail[] = [
//     new Rail(stations[0], [new Position(50.063, 19.925), new Position(50.065, 19.915)], stations[1]),
//     new Rail(stations[0], [new Position(50.065, 19.945), new Position(50.065, 19.955)], stations[2]),
// ];

const trains: Train[] = [
    // new Train(123, tType, "ZGADZA SIĘ", new TrainPosition(rails[0], TrainDirection.FromEndToStart, 350), stations[1], stations[2]),
    // new Train(456, tType, "TAK", new TrainPosition(rails[1], TrainDirection.FromStartToEnd, 1000), stations[2], stations[0]),
];

simulation.rails.forEach((rail) => {
    displayRail(rail);
});

simulation.stations.forEach((station) => {
    displayStation(station);
});

trains.forEach((train) => {
    displayTrain(train);
});
