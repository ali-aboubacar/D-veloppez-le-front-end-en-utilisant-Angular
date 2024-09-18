// TODO: create here a typescript interface for an olympic country

import { IParticipation } from "./Participation";

/*
example of an olympic country:
{
    id: 1,
    country: "Italy",
    participations: []
}
*/
export interface IOlympic {
    id: number,
    country: string,
    participations: IParticipation[]
}

export interface IOlympicDisplay {
    id: number,
    country: string,
    participations: IParticipation[],
    medalsAmount: number,
    allAthletes: number
}