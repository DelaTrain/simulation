import { makeBrandedType } from "./makeBrandedType";

/**
 * Quasi-enum saying if the Train is waiting or going
 */
export const TrainStatus = makeBrandedType({
    Waiting : "0",
    NotWaiting : "1"
}, 'trainStatus') ;

export type TrainStatus = (typeof TrainStatus)[keyof typeof TrainStatus];
