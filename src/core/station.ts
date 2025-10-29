import { Train } from "./train";

/**
 * For representation of each Platform at the station
 */
export class Platform {
    /** all Train units present on the Platform */
    #currectOccupancy: Train[] = [];
    /** maximum amount of Train units on the Platform */
    #capacity: number = 1;

    constructor(capacity: number) {
        this.#capacity = capacity;
    }

    /**
     * Checks if the Platform has some space for a train or trains
     * @returns false if is full
     */
    isNotFull(): boolean {
        if (this.#currectOccupancy.length == this.#capacity || this.#currectOccupancy.every((train) => train != null)) {
            return false;
        } else return true;
    }

    /**
     * Removes a specified train from the Platform
     * @param train train to be removed from the Platform
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
     * Deals with train arrival on the Platform
     * @param train arrived train
     * @returns false if the Platform is full
     */
    trainArrival(train: Train): boolean {
        let currentNumber = this.#currectOccupancy.length;
        if (currentNumber < this.#capacity) {
            return this.#currectOccupancy.push(train) > currentNumber;
        }
        return false;
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

/**
 * For representation of each train Station
 */
export class Station {
    /** ???? */
    #trainsSchedule: string = ""; // zależy, co dostarczy Kacper ????? TODO
    /** Platform units of the Station */
    #platforms: Platform[] = [];
    #distances: Map<Train, number> = new Map();

    /*
    constructor(trainsSchedule, trains) {
        for(let i = 0; i < cos; i++){
            this.#platforms.push(new Platform(pojemnosc)); // tworzenie peronów
            // operacje startowe na pociągach itd.
        }
    }
    */
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
}
