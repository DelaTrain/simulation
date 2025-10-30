import { ImportedData } from "../utils/importer";
import type { Station } from "./station";
import "./train";
import type { Train } from "./train";
import DATA from "../../data/delatrain.json";
import type { Rail } from "./rail";

export class Simulation {
    timeStep: number = 15000; // in milliseconds
    currentTime: number = Date.now(); // in milliseconds

    stations: Map<string, Station>;
    trains: Train[];
    rails: Set<Rail>;

    constructor(data: ImportedData) {
        this.stations = data.stations;
        this.trains = data.trains;
        this.rails = data.rails;
    }

    step() {
        this.currentTime += this.timeStep;
    }

    restart() {
        this.currentTime = Date.now();
    }
}

/*
        First version goals:
            * delays creating by clicking
            * train delays propagation
                - waiting for train transfers
                    from delayed ones
                    (probablistic, by the TrainType/ time)
                - next delays beacuse of the previous ones
                - platforms limitiations
            * delays in times by stations graphs
            * delay range on the map (?)
*/

const importedData = new ImportedData(DATA);
export const simulation = new Simulation(importedData);
