import { Rail } from "../core/rail";
import { Station, Track } from "../core/station";
import { Train, TrainType } from "../core/train";
import DATA from "../data/data.json";
import { Position } from "./position";

function mapCategoryToTrainType(category: string) {
    switch (category) {
        case "BUS":
            return new TrainType(0, 40, 80, 1);
        case "R":
            return new TrainType(1, 60, 120, 2);
        default:
            return new TrainType(2, 80, 160, 3);
    }
}

//TODO: move importing logic to class and do it on function call

//TODO: this should be Map not Array
export const stations: Array<Station> = DATA.stations.map(
    (station) => new Station(station.name, new Position(station.latitude, station.longitude))
);

export const trains: Array<Train> = DATA.trains.map((t) => {
    const train = new Train(`${t.name} ${t.number}`, mapCategoryToTrainType(t.category), null!, null!, null!); // TODO: What position and targets have not spawned trains?
    if (t.stops.length < 2) {
        throw new Error(`Train ${t.name} ${t.number} has less than 2 stops`);
    }

    for (let i = 0; i < t.stops.length; i++) {
        const stop_current = t.stops[i];
        const stop_next = i + 1 >= t.stops.length ? t.stops[i + 1] : null;

        const sc = stations.filter((s) => s.name === stop_current.station_name);
        if (sc.length !== 1) {
            throw new Error(`Train ${t.name} ${t.number} has invalid stop station: ${stop_current.station_name}`);
        }
        const sn = stations.filter((s) => s.name === stop_next?.station_name);
        if (sn.length === 1) {
            rails.add(new Rail(sc[0], [], sn[0]));
        }

        const station = sc[0];
        station.addScheduleInfo(
            train,
            stop_current.arrival_time == null ? null : new Date(stop_current.arrival_time),
            stop_current.departure_time == null ? null : new Date(stop_current.departure_time),
            stop_next?.station_name ?? "", //TODO: i think that pointer to object would be better and take less space
            0 // TODO: WHY? Why distance not Rail? Distance can be calculated from next station anyway!
        );
    }

    return train;
});

export const rails: Set<Rail> = new Set(); //TODO: it's added in trains loop above and i don't think that js will correctly compare objects here
