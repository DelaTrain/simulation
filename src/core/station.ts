import type { Position } from "../utils/position";
import type { Rail } from "./rail";
import { Train } from "./train";

/**
 * For representation of each platform Track at the station
 */
export class Track {
    #platformNumber: number;
    /** track "number" within the platform may have some letters in it */
    #trackNumber: string;

    // TODO jakseluz: zamień poniższe na Train | null (tylko jeden pociąg moze zajmować tor)

    /** all Train units present on the platform track */
    #currectOccupancy: Train[] = [];


    /** maximum amount of Train units on the Track */
    #capacity: number = 1;

    constructor(platformNumber: number, trackNumber: string, capacity: number) {
        this.#platformNumber = platformNumber;
        this.#trackNumber = trackNumber;
        this.#capacity = capacity;
    }

    /**
     * Checks if the Track has some space for a train or trains
     * @returns false if is full
     */
    isNotFull(): boolean {
        if (this.#currectOccupancy.length == this.#capacity || this.#currectOccupancy.every((train) => train != null)) {
            return false;
        } else return true;
    }

    /**
     * Removes a specified train from the Track
     * @param train train to be removed from the Track
     * @returns true if success
     */
    trainDepart(train: Train): boolean {
        let deletedTrain = this.#currectOccupancy.splice(this.#currectOccupancy.indexOf(train), 1);
        if (deletedTrain.length == 1) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Deals with train arrival on the Track
     * @param train arrived train
     * @returns false if the Track is full
     */
    trainArrival(train: Train): boolean {
        let currentNumber = this.#currectOccupancy.length;
        if (currentNumber < this.#capacity) {
            return this.#currectOccupancy.push(train) > currentNumber;
        }
        return false;
    }

    get platformNumber() {
        return this.#platformNumber;
    }
    get trackNumber() {
        return this.#trackNumber;
    }
    get currentOccupancy() {
        return this.#currectOccupancy.length;
    }
    get capacity() {
        return this.#capacity;
    }
    get trains() {
        return this.#currectOccupancy;
    }
}

class TrainScheduleStep {
    #trainNumber: number;
    #arrivalTime: Date | null;
    #departureTime: Date | null;
    #nextStation: Station | null;
    #nextRail: Rail | null;

    constructor(
        trainID: number,
        arrivalTime: Date | null,
        departureTime: Date | null,
        nextStation: Station | null,
        nextRail: Rail | null,
    ) {
        this.#trainNumber = trainID;
        this.#arrivalTime = arrivalTime;
        this.#departureTime = departureTime;
        this.#nextStation = nextStation;
        this.#nextRail = nextRail;
    }

    get trainNumber() {
        return this.#trainNumber;
    }
    get arrivalTime() {
        return this.#arrivalTime;
    }
    get departureTime() {
        return this.#departureTime;
    }
    get nextStation() {
        return this.#nextStation;
    }
    get nextRail() {
        return this.#nextRail;
    }
}

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
