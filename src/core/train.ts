import type { Station } from "./station";
import { TrainStatus } from "./trainStatus";
import { simulation } from "./simulation";

/**
 * For representation of each Train Type depending on the train model/ company
 */
export class TrainType {
    /** priority scale value amongst trains */
    #priority: number = 0;
    /** the time exceeding which will result in some delay */
    #maxWaitingTime: number = 0; // Is it ok?
    /** speed value which cannot be surpassed */
    #maxVelocity: number = 0;
    /** idk; probably some parameter describing capability of gaining the above speed */
    #acceleration: number = 0;

    constructor(priority: number, maxWaitingTime: number, maxVelocity: number, acceleration: number) {
        this.#priority = priority;
        this.#maxWaitingTime = maxWaitingTime;
        this.#maxVelocity = maxVelocity;
        this.#acceleration = acceleration;
    }

    /**
     * Changes train priority
     * @param newPriority new train priority
     */
    updatePriority(newPriority: number) {
        this.#priority = newPriority;
    }

    get priority() {
        return this.#priority;
    }
    get maxWaitingTime() {
        return this.#maxWaitingTime;
    }
    get maxVelocity() {
        return this.#maxVelocity;
    }
    get acceleration() {
        return this.#acceleration;
    }
}

/**
 * For representation of each Train Position on the way
 */
export class TrainPosition {
    // maybe export should be here also
    /** distance from the previous Station */
    #distance: number; // in something per step // TODO - modify when velocity set
    /** as the name suggests - idk if mandatory in the basic version */
    #railNumber: number;

    constructor(distance: number, railNumber: number) {
        this.#distance = distance;
        this.#railNumber = railNumber;
    }

    /**
     * Moves train in a simulation step period
     * @param velocity train current velocity
     * @param acceleration train current acceleration
     */
    trainStep(velocity: number, acceleration: number) {
        this.#distance +=
            velocity * simulation.timeStep + (1 / 2) * (acceleration * simulation.timeStep * simulation.timeStep);
    }

    /**
     * Changes the rail train is currently using
     * @param newRailNumber (new) current rail number
     */
    updateRailNumber(newRailNumber: number) {
        this.#railNumber = newRailNumber;
    }

    get distance() {
        return this.#distance;
    }
    get railNumber() {
        return this.#railNumber;
    }
}

/**
 * For representation of each Train in the simulation
 */
export class Train {
    /**  */
    #ID: string;
    /** train model or company */
    #type: TrainType;
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
    #position: TrainPosition;
    /** says if the train is waiting or not */
    #status: TrainStatus = TrainStatus.Waiting;
    /** individual time of being late */
    #delay: number = 0;

    constructor(
        ID: string,
        trainType: TrainType,
        currentPosition: TrainPosition,
        goalFinal: Station,
        goalStep: Station
    ) {
        this.#ID = ID;
        this.#type = trainType;
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
     * @param newRailNumber optional rail (number) change
     */
    moveTrain(newRailNumber?: number) {
        let goalDistance = this.#goalStationStep.distances.get(this);
        if (goalDistance) {
            if (true) {
                // (goalDistance - this.#position.#distance) // TODO
                this.#position.trainStep(this.#velocity, this.#acceleration);
            } else {
                // TODO
            }
        } else {
            this.#status = TrainStatus.Waiting;
        }
        if (newRailNumber) {
            this.#position.updateRailNumber(newRailNumber);
        }
    }

    get ID() {
        return this.#ID;
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
