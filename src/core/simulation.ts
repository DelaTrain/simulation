export class Simulation {
    timeStep: number = 60000; // in milliseconds
    currentTime: number = Date.now(); // in milliseconds

    constructor() {}
    step() {
        this.currentTime += this.timeStep;
    }
    restart() {
        this.currentTime = Date.now();
    }
}

export const simulation = new Simulation();
