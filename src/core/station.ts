import type { Position } from "../utils/position";
import type { Rail } from "./rail";
import { Train } from "./train";
import { TrainScheduleStep } from "./trainScheduleStep.ts"
import { Track } from "./track.ts"

/**
 * For representation of each train Station
 */
export class Station {
    #name: string;
    #position: Position;

    /** contains info about each Train next goal, especially the distance to the next Station */
    #trainsSchedule: TrainScheduleStep[] = [];
    /** Platform units of the Station */
    #tracks: Track[] = [];

    #distances: Map<Train, number> = new Map();

    constructor(name: string, position: Position) {
        this.#name = name;
        this.#position = position;
    }

    addScheduleInfo(
        train: Train,
        arrivalTime: Date | null,
        departureTime: Date | null,
        nextStation: Station | null,
        nextRail: Rail | null,
    ) {
        let schedule = new TrainScheduleStep(train.number, arrivalTime, departureTime, nextStation, nextRail);
        this.#trainsSchedule.push(schedule);
        this.#distances.set(train, schedule.nextRail?.length() ?? 0);
    }
    // creating and starting trains methods
    // delay managing -> the most complex mechanism

    /*
    constructor(trainSchedule : string, ) {             // TODO - koncepcja przechowywania i tworzenia obiektów Platform zależy od scrapera
    }
    */

    /*
    startTrains() { // wywoływane cyklicznie
        // według rozkładu -> uruchom metody na odpowiednich Platform i Train
        // - ustaw im dystanse do najbliższego postoju
        // - zmień wpis stacji
        // (modyfikujące prędkości - np. na zero, przyspieszenia i cele stacji oraz TrainStatus itd.)
    }
    */

    /*
    delayTrain() {
        // stwórz zmodyfikowany rozkład jazdy
    }
    */

    get distances() {
        return this.#distances;
    }

    get name(): string {
        return this.#name;
    }
    get position(): Position {
        return this.#position;
    }
}
