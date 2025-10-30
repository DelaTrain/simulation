import type { Station } from "./station";
import { TrainStatus } from "./trainStatus";
import type { Rail } from "./rail";
import { Position } from "../utils/position";
import { TrainCategory } from "./trainCategory";
import { TrainDirection, TrainPosition } from "./trainPosition";

/**
 * For representation of each Train in the simulation
 */
export class Train {
    /** should be unique in Poland */
    #number: number;
    /** train company (or their subcategory) */
    #type: TrainCategory;
    /** human-friendly name of the train */
    #customName: string | null = null;
    /** train speed value */
    #velocity: number = 0; // TODO - unit
    /** train acceleration value */
    #acceleration: number = 0;
    /** final station for the train */
    #goalStationFinal: Station;
    /**
     * CURRENT Station  -> if staying at the station/ on the platform
     *
     * NEXT Station     -> if on the way
     * */
    #goalStationStep: Station;
    /** contains distance and rail number */
    #position: TrainPosition | null;
    /** says if the train is waiting or not */
    #status: TrainStatus = TrainStatus.Waiting;
    /** individual time of being late */
    #delay: number = 0;

    constructor(
        number: number,
        trainType: TrainCategory,
        customName: string | null,
        currentPosition: TrainPosition | null,
        goalFinal: Station,
        goalStep: Station
    ) {
        this.#number = number;
        this.#type = trainType;
        this.#customName = customName;
        this.#goalStationFinal = goalFinal;
        this.#goalStationStep = goalStep;
        this.#position = currentPosition;
    }

    /**
     * Changes Train velocity
     * @param newVelocity updated velocity
     */
    updateVelocity(newVelocity: number) {
        this.#velocity = newVelocity;
    }

    /**
     * Changes Train acceleration
     * @param newAcceleration updated acceleration
     */
    updateAcceleration(newAcceleration: number) {
        this.#acceleration = newAcceleration;
    }

    /**
     * Changes Train goal(s)
     * @param StepStation updated goal for the next stop
     * @param finalStation optional final goal
     */
    updateGoal(stepStation: Station, finalStation?: Station) {
        this.#goalStationStep = stepStation;
        if (finalStation) {
            this.#goalStationFinal = finalStation;
        }
    }

    stop() {
        this.#velocity = 0;
        this.#acceleration = 0;
    }

    /**
     * Moves Train
     * @param newRail optional rail (number) change //TODO: Update comment
     */
    moveTrain(position: Position, newRail?: Rail) {
        //let goalDistance = this.#goalStationStep.distances.get(this);
        this.setPosition();
        let goalDistance = this.#position!.updateCoords(position);
        if (this.#position!.coordsPosition.distanceTo(this.#goalStationStep.position) > this.position!.getTrainStep(this.#velocity, this.#acceleration)) {
            this.position!.trainStep(this.#velocity, this.#acceleration);
        } else {
            this.#status = TrainStatus.Waiting;
        }
        if (newRail) {
            this.#position!.updateRailNumber(newRail);
        }
    }

    displayName(): string {
        return `${this.#type.name} ${this.#number}${this.#customName ? ` "${this.#customName}"` : ""}`;
    }

    updateStatus(status: TrainStatus){
        this.#status = status;
    }

    setPosition() { // RAIL
        this.#position = new TrainPosition(null!, TrainDirection.FromStartToEnd);
    }

    get number() {
        return this.#number;
    }
    get type() {
        return this.#type;
    }
    get velocity() {
        return this.#velocity;
    }
    get acceleration() {
        return this.#acceleration;
    }
    get goalStationFinal() {
        return this.#goalStationFinal;
    }
    get goalStationStep() {
        return this.#goalStationStep;
    }
    get position() {
        return this.#position;
    }
    get status() {
        return this.#status;
    }
    get delay() {
        return this.#delay;
    }
}
