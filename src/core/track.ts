import { Train } from "./train";

/**
 * For representation of each platform Track at the station
 */
export class Track {
    #platformNumber: number;
    /** track "number" within the platform may have some letters in it */
    #trackNumber: string;
    /** all Train units present on the platform track */
    #currectOccupancy: Train | null;


    /** maximum amount of Train units on the Track */
    #capacity: number = 1;

    constructor(platformNumber: number, trackNumber: string, capacity: number) {
        this.#platformNumber = platformNumber;
        this.#trackNumber = trackNumber;
        this.#capacity = capacity;
        this.#currectOccupancy = null;
    }

    /**
     * Checks if the Track has some space for a train or trains
     * @returns false if is full
     */
    isFull(): boolean {
        return this.#currectOccupancy != null;
    }

    /**
     * Removes a specified train from the Track
     * @param train train to be removed from the Track
     * @returns deleted Train or null if there is no
     */
    trainDepart(): Train | null {
        let deleted = this.#currectOccupancy;
        this.#currectOccupancy = null;
        return deleted;
    }

    /**
     * Deals with train arrival on the Track
     * @param train arrived train
     * @returns false if the Track is full
     */
    trainArrival(train: Train): boolean {
        if(this.#currectOccupancy == null){
            this.#currectOccupancy = train;
            return true;
        }else{
            return false;
        }
    }

    get platformNumber() {
        return this.#platformNumber;
    }
    get trackNumber() {
        return this.#trackNumber;
    }
    get currentOccupancy() {
        return this.#currectOccupancy;
    }
    get capacity() {
        return this.#capacity;
    }
    get trains() {
        return this.#currectOccupancy;
    }
}
