import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Hero } from "../heroes/hero.model";
import { HeroesService } from "../heroes/heroes.service";
import { Trainer } from "./trainer.model";

@Injectable({
    providedIn: 'root'
  })
export class TrainerService {
    private trainers: Trainer[] = [];
    trainersChanged = new Subject<Trainer[]>();
    constructor(private heroService: HeroesService){}
    getTrainer(email:string){
        return this.trainers.filter((trainer) => {
            return trainer.email == email;
        })[0];
    }
    getTrainers(){
        return this.trainers.slice();
    }
    getTrainerHeroes(email: string){
        let trainerFound = this.trainers.filter(trainer => {
            return trainer.email == email;
        })[0]
        return trainerFound.heroes;
    }
    setTrainers(trainers:Trainer[]){
        this.trainers = [];
        if(typeof(trainers)=='object'){
           Object.keys(trainers).forEach(key=>{
               if(!this.trainers.includes(trainers[key]))
                    this.trainers.push(trainers[key])
           }) 
        }
        this.trainersChanged.next(this.trainers.slice());
    }
    addTrainer(trainer:Trainer){
        this.trainers.push(trainer);
        this.trainersChanged.next(this.trainers.slice());
    }
    updateTrainerHeroes(email: string,heroes:Hero[]){
        let trainerFound = this.trainers.filter(trainer => {
            return trainer.email == email;
        })[0]
        trainerFound.heroes = heroes;
        this.trainersChanged.next(this.trainers.slice())
    }
    updateTrainers(){
        this.trainersChanged.next(this.trainers.slice());
    }
}