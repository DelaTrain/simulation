import { Rail } from "../core/rail";
import { Station } from "../core/station";
import { Train } from "../core/train";
import { TrainCategory } from "../core/trainCategory";
import { Position } from "./position";

function mapCategory(category: string) {
    switch (category) {
        case "Bus":
            return new TrainCategory("Bus", 0, 40, 80, 1);
        case "R":
            return new TrainCategory("R", 1, 60, 120, 2);
        case "KS":
            return new TrainCategory("KS", 1, 60, 120, 2);
        default:
            return new TrainCategory(category, 2, 80, 160, 3);
    }
}

export class ImportedData {
    #stations: Map<string, Station> = new Map();
    #trains: Array<Train> = [];
    #rails: Set<Rail> = new Set();

    // jak ktoś jest mądrzejszy ode mnie, to niech to ztypuje lepiej niż any
    constructor(jsonData: any) {
        this.#importStations(jsonData.stations);
        this.#importTrains(jsonData.trains);
    }

    #importStations(stations: any[]) {
        this.#stations = new Map(
            stations.map(
                (station) => [
                    station.name,
                    new Station(station.name, new Position(station.latitude, station.longitude)),
                ]
            )
        );
    }

    #importTrains(trains: any[]) {
        this.#trains = trains.map((t) => {
            // TODO: What position and targets have trains that haven't spawned yet?
            const train = new Train(t.number, mapCategory(t.category), t.name, null!, null!, null!);

            if (t.stops.length < 2) {
                throw new Error(`Train ${t.name} ${t.number} has less than 2 stops`);
            }

            for (let i = 0; i < t.stops.length; i++) {
                const stop_current = t.stops[i];
                const stop_next = i + 1 <= t.stops.length ? t.stops[i + 1] : null;

                const sc = this.#stations.get(stop_current.station_name);
                if (!sc) {
                    throw new Error(`Train ${t.name} ${t.number} has invalid stop station: ${stop_current.station_name}`);
                }
                if (i == 0) {
                    sc.addStartingTrain(train);
                }
                const sn = this.#stations.get(stop_next?.station_name);
                const rail = sn ? new Rail(sc, [], sn) : null;
                if (rail) {
                    this.#rails.add(rail);
                }

                let arrival_time = new Date();
                if (stop_current.arrival_time != null) {
                    const [hours, minutes, seconds] = stop_current.arrival_time.split(":").map((x: string) => parseInt(x, 10));
                    arrival_time.setHours(hours, minutes, seconds, 0);
                }
                let departure_time = new Date();
                if (stop_current.departure_time != null) {
                    const [hours, minutes, seconds] = stop_current.departure_time.split(":").map((x: string) => parseInt(x, 10));
                    departure_time.setHours(hours, minutes, seconds, 0);
                }

                sc.addScheduleInfo(
                    train,
                    stop_current.arrival_time == null ? null : arrival_time,
                    stop_current.departure_time == null ? null : departure_time,
                    sn ?? null,
                    rail,
                );
            }

            return train;
        });
    }

    get stations() {
        return this.#stations;
    }
    get trains() {
        return this.#trains;
    }
    get rails() {
        return this.#rails;
    }
}
