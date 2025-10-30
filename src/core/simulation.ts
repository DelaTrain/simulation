import { ImportedData } from "../utils/importer";
import type { Station } from "./station";
import "./train";
import type { Train } from "./train";
import DATA from "../../data/delatrain.json";
import type { Rail } from "./rail";
import { updateTime } from "../app";

export class Simulation {
    timeStep: number = 15000; // in milliseconds
    currentTime: number = Date.now(); // in milliseconds
    autorun: boolean = false;
    autorunSpeed: number = 250; // in milliseconds

    stations: Map<string, Station>;
    trains: Train[];
    rails: Set<Rail>;

    constructor(data: ImportedData) {
        this.stations = data.stations;
        this.trains = data.trains;
        this.rails = data.rails;
        this.#resetTime();
    }

    step() {
        this.currentTime += this.timeStep;
        updateTime();
    }

    runAutomatically() {
        if (!this.autorun) return;
        this.step();
        setTimeout(() => this.runAutomatically(), this.autorunSpeed);
    }

    restart() {
        this.#resetTime();
        updateTime();
    }

    #resetTime() {
        const date = new Date();
        date.setHours(6, 0, 0, 0);
        this.currentTime = date.getTime();
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
