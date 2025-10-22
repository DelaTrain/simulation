export class Simulation {
    timeStep: number = 60; // in seconds
    currentTime: number = Date.now(); // in seconds

    constructor() {}
    step() {}
}

export const simulation = new Simulation();
