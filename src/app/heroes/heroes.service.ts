import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Hero } from "./hero.model";

@Injectable({
    providedIn: 'root'
  })
export class HeroesService {
    showHeroChanged = new Subject<boolean>();
    heroesChanged = new Subject<Hero[]>();
    trainingSuccessChanged = new Subject<boolean>();
    private heroes:Hero[] = [];

    constructor(private route: Router){}
    
    addHero(hero:Hero){
        this.heroes.push(hero);
        this.heroesChanged.next(this.heroes.slice());
    }
    trainHero(heroToTrain:Hero){
        if(heroToTrain.timesTrainedToday == undefined){
            heroToTrain.timesTrainedToday = [];
        }

        if(this.limitTimesOfTrainingADay(heroToTrain)){
            heroToTrain.currentPower = this.returnNumberAfterHeroTraining(heroToTrain.currentPower);
            this.heroesChanged.next(this.heroes.slice());
            this.trainingSuccessChanged.next(true);
        } else {
            this.trainingSuccessChanged.next(false);
        }
    }
    deleteHero(heroToDelete:Hero){
        let heroToDeleteIndex = this.heroes.indexOf(heroToDelete);
        this.heroes.splice(heroToDeleteIndex,1);
        this.heroesChanged.next(this.heroes.slice());
    }
    getHeroes(){
        return this.heroes.slice();
    }
    returnNumberAfterHeroTraining(num: number){
        return parseFloat((num * (1 + Math.floor(Math.random() * 10) / 100)).toFixed(2));
    }
    limitTimesOfTrainingADay(hero:Hero){
        if(hero.timesTrainedToday[4]==undefined){
            hero.timesTrainedToday.push(new Date().getUTCDay());
            return true;
        }
        if(hero.timesTrainedToday.length==5){
            if(hero.timesTrainedToday[4]==(new Date().getUTCDay())){
                return false;
            }
            if(hero.timesTrainedToday[4]!=(new Date().getUTCDay())){
                hero.timesTrainedToday = [];
                hero.timesTrainedToday.push(new Date().getUTCDay());
                return true;
            }
        }
        return false;
    }
    setHeroes(heroes:Hero[]){
        this.heroes = heroes;
        this.heroesChanged.next(heroes);
    }
    updateHeroTimesTrainedToday(hero:Hero){
        if(hero.timesTrainedToday == undefined){
            hero.timesTrainedToday = [];
        }
        if(hero.timesTrainedToday.length==5){
            if(hero.timesTrainedToday[4]!=(new Date().getUTCDay())){
                hero.timesTrainedToday = [];
            }
        }
    }
    heroDisplayChange(changeDisplay:boolean){
        this.showHeroChanged.next(changeDisplay);
    }
}