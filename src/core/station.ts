import type { Position } from "../utils/position";
import type { Rail } from "./rail";
import { Train } from "./train";
import { TrainScheduleStep } from "./trainScheduleStep.ts"
import { Track } from "./track.ts"
import { TrainStatus } from "./trainStatus.ts";
import { simulation } from "./simulation.ts";

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
    /** trains starting at this Station */
    #startingTrains: Train[] = [];

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

    /** Adds a train starting at this Station */
    addStartingTrain(train: Train) {
        this.#startingTrains.push(train);
    }



    // creating and starting trains methods
    // delay managing -> the most complex mechanism

    /*
    constructor(trainSchedule : string, ) {             // TODO - koncepcja przechowywania i tworzenia obiektów Platform zależy od scrapera
    }
    */


    startTrains(currentTime: Date) {
        for(let i = 0; i < this.#trainsSchedule.length; i++){
            const trainS = this.#startingTrains.find((t) => t.number == this.#trainsSchedule[i].trainNumber)
            if(trainS) {
                const dt = this.#trainsSchedule[i].departureTime
                if(dt != null){

                    if(dt.getHours() === currentTime.getHours() &&
                       dt.getMinutes() === currentTime.getMinutes()) {
                        const spawned = simulation.trainsUnspawned.splice(simulation.trainsUnspawned.indexOf(trainS), 1);
                        spawned[0].setPosition(this.#trainsSchedule[i].nextRail!);
                        simulation.trains.push(spawned[0]);
                    }
                }
            }
        }
    }

    findNextRailForTrain(train: Train): Rail | null {
        const schedule = this.#trainsSchedule.find((s) => s.trainNumber === train.number);
        if (schedule) {
            return schedule.nextRail;
        }
        return null;
    }

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
