import { Hero } from "../heroes/hero.model";
import { SuitColors } from "../shared/suitColors.enum";

export class Trainer {
    public username: string;
    public email: string;
    public dayStart: string;
    public heroes: Hero[];

    constructor(username: string, email: string){
        this.username = username;
        this.email = email;
        this.dayStart = Date.now().toFixed();
        this.heroes = [new Hero("/assets/heroesimages/Hercules.jpg","Hercules",true,[SuitColors.Black,SuitColors.Blue],12), 
            new Hero("/assets/heroesimages/Odysseus.jpg","Odysseus",false,[SuitColors.White, SuitColors.Blue],14),
            new Hero("/assets/heroesimages/Achilles.jpg","Achilles",false,[SuitColors.Green,SuitColors.Blue],13),
            new Hero("/assets/heroesimages/Atlanta.jpg","Atlanta",true,[SuitColors.White, SuitColors.Blue],14),
            new Hero("/assets/heroesimages/Jason.jpg","Jason", true, [SuitColors.Black, SuitColors.Red],14),
            new Hero("/assets/heroesimages/Theseus.jpg","Theseus", true, [SuitColors.Black, SuitColors.Red],14)];
    }
}