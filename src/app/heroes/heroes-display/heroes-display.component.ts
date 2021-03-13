import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { TrainerService } from 'src/app/trainer/trainer.service';
import { Hero } from '../hero.model';
import { HeroesService } from '../heroes.service';

@Component({
  selector: 'app-heroes-display',
  templateUrl: './heroes-display.component.html',
  styleUrls: ['./heroes-display.component.css']
})
export class HeroesDisplayComponent implements OnInit {
  @Input() email: string;
  heroes!: Hero[];
  hero:Hero;
  showHero:boolean = false;
  heroSubscription: Subscription;
  displayHeroSubscription: Subscription;

  constructor(private heroesSerivce : HeroesService, 
    private dataStorageService:DataStorageService, 
    private trainerService: TrainerService,
    private router: Router) { }

  ngOnInit(): void {
    this.displayHeroSubscription = this.heroesSerivce.showHeroChanged.subscribe((display)=>{
      this.showHero = display;
    })
    this.heroes = this.sortByCurrentPower(this.heroesSerivce.getHeroes());
    
    this.heroSubscription = this.heroesSerivce.heroesChanged.subscribe( heroes=>{
      this.heroes = this.sortByCurrentPower(heroes);
      this.trainerService.updateTrainerHeroes(this.email,heroes);
      this.dataStorageService.storeTrainers();
    })

  }
  
  trainHero(hero:Hero){
    this.heroesSerivce.trainHero(hero);
  }
  sortByCurrentPower(li:Hero[]){
    return li.sort((a:Hero,b:Hero) =>  b.currentPower - a.currentPower);
  }
  heroChosen(hero:Hero){
    this.heroesSerivce.updateHeroTimesTrainedToday(hero);
    this.heroesSerivce.showHeroChanged.next(true);
    this.showHero = true;
    this.hero = hero;
  }
  exitHero(){
    this.showHero = false;
    this.heroesSerivce.showHeroChanged.next(false);
    this.heroesSerivce.trainingSuccessChanged.next(true);
  }

}
