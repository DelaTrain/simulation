import type { Station } from "./station";
import "./train";
import type { Train } from "./train";

export class Simulation {
    timeStep: number = 15000; // in milliseconds
    currentTime: number = Date.now(); // in milliseconds

    stations: Map<string, Station> = new Map();
    trains: Map<string, Train> = new Map();

    constructor() {}

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

export const simulation = new Simulation();
