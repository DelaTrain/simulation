import { Rail } from "./rail";
import { Station } from "./station";

export class TrainScheduleStep {
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
