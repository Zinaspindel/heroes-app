import { UUID } from 'angular2-uuid';
import { SuitColors } from '../shared/suitColors.enum';

export class Hero {
    public imgPath: string;
    public name: string;
    public ability: boolean;
    public id: UUID;
    public startingTrainingDate: string;
    public suitColors: SuitColors[];
    public startingPower: number;
    public currentPower: number;
    public timesTrainedToday: number[];

    constructor(img: string,name: string, ability: boolean, suitcolors: SuitColors[], startingPower: number){
        this.imgPath = img;
        this.name = name;
        this.ability = ability;
        this.id = UUID.UUID();
        this.startingTrainingDate = new Date().toUTCString();
        this.suitColors = suitcolors;
        this.startingPower = startingPower;
        this.currentPower = startingPower;
        this.timesTrainedToday = [];
    }

}