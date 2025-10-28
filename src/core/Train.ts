import type { Station } from "./Station";
import { TrainStatus } from "./TrainStatus";
import { simulation } from "./simulation";


/**
 * For representation of each Train Type depending on the train model/ company
 */
export class TrainType {
    /** priority scale value amongst trains */
    _priority : number = 0;
    /** the time exceeding which will result in some delay */
    _maxWaitingTime: number = 0; // Is it ok?
    /** speed value which cannot be surpassed */
    _maxVelocity: number = 0;
    /** idk; probably some parameter describing capability of gaining the above speed */
    _acceleration: number = 0;

    constructor(priority : number, maxWaitingTime : number, maxVelocity : number, acceleration : number) {
        this._priority = priority;
        this._maxWaitingTime = maxWaitingTime;
        this._maxVelocity = maxVelocity;
        this._acceleration = acceleration;
    }

    /**
     * Changes train priority
     * @param newPriority new train priority
     */
    updatePriority(newPriority : number) {
        this._priority = newPriority;
    }

    get priority() { return this._priority; }
    get maxWaitingTime() { return this._maxWaitingTime; }
    get maxVelocity() { return this._maxVelocity; }
    get acceleration() { return this._acceleration; }
}


/**
 * For representation of each Train Position on the way
 */
export class TrainPosition { // maybe export should be here also
    /** distance from the previous Station */
    _distance : number; // in something per step // TODO - modify when velocity set
    /** as the name suggests - idk if mandatory in the basic version */
    _railNumber : number;

    constructor(distance : number, railNumber : number) {
        this._distance = distance;
        this._railNumber = railNumber;
    }

    /**
     * Moves train in a simulation step period
     * @param velocity train current velocity
     * @param acceleration train current acceleration
     */
    trainStep (velocity : number, acceleration : number) {
        this._distance += velocity * simulation.timeStep + ((1/2) * (acceleration * simulation.timeStep * simulation.timeStep));
    }

    /**
     * Changes the rail train is currently using
     * @param newRailNumber (new) current rail number
     */
    updateRailNumber(newRailNumber : number) {
        this._railNumber = newRailNumber;
    }

    get distance() { return this._distance; }
    get railNumber() { return this._railNumber; }
}


/**
 * For representation of each Train in the simulation
 */
export class Train {
    /**  */
    _ID : string;
    /** train model or company */
    _type : TrainType;
    /** train speed value */
    _velocity : number = 0; // TODO - unit
    /** train acceleration value */
    _acceleration : number = 0;
    /** final station for the train */
    _goalStationFinal : Station;
    /**
     * CURRENT Station  -> if staying at the station/ on the platform
     *
     * NEXT Station     -> if on the way
     * */
    _goalStationStep : Station;
    /** contains distance and rail number */
    _position : TrainPosition;
    /** says if the train is waiting or not */
    _status : TrainStatus = TrainStatus.Waiting;
    /** individual time of being late */
    _delay : number = 0;

    constructor (ID : string, trainType : TrainType, currentPosition : TrainPosition, goalFinal : Station, goalStep : Station) {
        this._ID = ID;
        this._type = trainType;
        this._goalStationFinal = goalFinal;
        this._goalStationStep = goalStep;
        this._position = currentPosition;
    }

    /**
     * Changes Train velocity
     * @param newVelocity updated velocity
     */
    updateVelocity(newVelocity : number) {
        this._velocity = newVelocity;
    }

    /**
     * Changes Train acceleration
     * @param newAcceleration updated acceleration
     */
    updateAcceleration(newAcceleration : number) {
        this._acceleration = newAcceleration
    }

    /**
     * Changes Train goal(s)
     * @param StepStation updated goal for the next stop
     * @param finalStation optional final goal
     */
    updateGoal(stepStation : Station, finalStation? : Station) {
        this._goalStationStep = stepStation;
        if(finalStation) { this._goalStationFinal = finalStation; }
    }

    stop() {
        this._velocity = 0;
        this._acceleration = 0;
    }

    /**
     * Moves Train
     * @param newRailNumber optional rail (number) change
     */
    moveTrain(newRailNumber? : number) {
        let goalDistance = this._goalStationStep._distances.get(this);
        if(goalDistance) {
            if(true){ // (goalDistance - this._position._distance) // TODO
                this._position.trainStep(this._velocity, this._acceleration);
            } else {
                // TODO
            }
        } else {
            this._status = TrainStatus.Waiting;
        }
        if(newRailNumber) { this._position.updateRailNumber(newRailNumber); }
    }

    get ID() { return this._ID; }
    get type() { return this._type; }
    get velocity() { return this._velocity; }
    get acceleration() { return this._acceleration; }
    get goalStationFinal() { return this._goalStationFinal; }
    get goalStationStep() { return this._goalStationStep; }
    get position() { return this._position; }
    get status() { return this._status; }
    get delay() { return this._delay; }
}


