import { simulation } from "./simulation";
import type { Rail } from "./rail";
import { Position } from "../utils/position";

export enum TrainDirection {
    FromStartToEnd,
    FromEndToStart,
}

/**
 * For representation of each Train Position on the way
 */
export class TrainPosition {
    // maybe export should be here also
    /** distance from the previous Station */
    #distance: number; // in something per step // TODO - modify when velocity set
    /** as the name suggests - idk if mandatory in the basic version */
    #rail: Rail;
    #direction: TrainDirection;

    constructor(rail: Rail, direction: TrainDirection = TrainDirection.FromStartToEnd, distance: number = 0) {
        this.#distance = distance;
        this.#rail = rail;
        this.#direction = direction;
    }

    /**
     * Moves train in a simulation step period
     * @param velocity train current velocity
     * @param acceleration train current acceleration
     */
    trainStep(velocity: number, acceleration: number) {
        this.#distance +=
            this.getTrainStep(velocity, acceleration);
    }

    getTrainStep(velocity: number, acceleration: number): number {
        return velocity * simulation.timeStep + (1 / 2) * (acceleration * simulation.timeStep * simulation.timeStep);
    }

    /**
     * Changes the rail train is currently using
     * @param newRailNumber (new) current rail number
     */
    updateRailNumber(newRail: Rail) {
        this.#rail = newRail;
        this.#distance = 0;
    }

    calculatePosition(): Position {
        if (this.#direction === TrainDirection.FromStartToEnd) {
            return this.#rail.findPositionAtDistance(this.#distance);
        } else {
            return this.#rail.findPositionAtDistance(this.#rail.length() - this.#distance);
        }
    }

    moveAlongRail(distanceDelta: number) {
        this.#distance += distanceDelta;
    }

    get distance() {
        return this.#distance;
    }
    get rail() {
        return this.#rail;
    }
}
