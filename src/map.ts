import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Station } from "./core/station";
import { Position } from "./utils/position";
import { Rail } from "./core/rail";
import { Train, TrainDirection, TrainPosition, TrainType } from "./core/train";

export const map = L.map("map").setView([50.061389, 19.938333], 12);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

export const displayStation = (station: Station) => {
    const marker = L.marker(station.position.toArray()).addTo(map);
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
    marker.bindPopup(`<b>Train ID: ${train.ID}</b>`).openPopup();
    return marker;
};

const stations: Station[] = [
    new Station("Central Station", new Position(50.061389, 19.938333)),
    new Station("West Side Station", new Position(50.067, 19.912)),
    new Station("East End Station", new Position(50.055, 19.965)),
];

const rails: Rail[] = [
    new Rail(stations[0], [new Position(50.063, 19.925), new Position(50.065, 19.915)], stations[1]),
    new Rail(stations[0], [new Position(50.065, 19.945), new Position(50.065, 19.955)], stations[2]),
];

const tType = new TrainType(1, 60, 120, 2);

const trains: Train[] = [
    new Train("123", tType, new TrainPosition(rails[0], TrainDirection.FromEndToStart, 350), stations[1], stations[2]),
    new Train("456", tType, new TrainPosition(rails[1], TrainDirection.FromStartToEnd, 1000), stations[2], stations[0]),
];

rails.forEach((rail) => {
    displayRail(rail);
});

stations.forEach((station) => {
    displayStation(station);
});

trains.forEach((train) => {
    displayTrain(train);
});
