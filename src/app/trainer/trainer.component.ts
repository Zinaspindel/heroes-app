import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Hero } from '../heroes/hero.model';
import { HeroesService } from '../heroes/heroes.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Trainer } from './trainer.model';
import { TrainerService } from './trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css'],
  providers: [HeroesService]
})
export class TrainerComponent implements OnInit, OnDestroy {
  trainers!: Trainer[];
  trainer!: Trainer;
  loggedUser: User;
  error: boolean = false;
  showHero: boolean = false;
  
  trainersSubscription!: Subscription;
  heroesSubscription!: Subscription;
  userSubscription!: Subscription;
  heroDisplaySubscription!: Subscription;
  trainingSuccessSubsription!: Subscription;
  constructor(private trainerService: TrainerService, 
    private heroesSerivce: HeroesService, 
    private route:ActivatedRoute,
    private authService: AuthService,
    private router: Router) {  
  }

  ngOnInit(): void {

    this.heroDisplaySubscription = this.heroesSerivce.showHeroChanged.subscribe((display)=>{
      this.showHero = display;
    }) 

    this.userSubscription = this.authService.user.subscribe((user)=>{
      this.loggedUser = user;
    })

    this.trainersSubscription = this.trainerService.trainersChanged.subscribe((trainers)=>{
      this.trainers = trainers;
    })
    
    this.trainingSuccessSubsription = this.heroesSerivce.trainingSuccessChanged.subscribe((state)=>{
      this.error = !state;
    })

    this.trainers = this.trainerService.getTrainers();
    this.trainer = this.trainers.filter( trainer => {
      return trainer.email == this.loggedUser.email;
    })[0];
    this.heroesSerivce.setHeroes(this.trainer.heroes);

    // this.route.queryParams
    // .subscribe(
    //   (queryParams : Params)=>{
    //     console.log(this.showHero)
    //     if(!this.showHero){
    //       this.error = false;
    //     }else {
    //       this.error = queryParams['training'] == 'failed' ? true : false;
    //     }
    //   }
    // )
  }

  exitHero() {
    this.heroesSerivce.showHeroChanged.next(false);
    this.heroesSerivce.trainingSuccessChanged.next(true);
    // this.router.navigate([],{
    //   queryParams: {
    //     'training': null
    //   },
    //   queryParamsHandling: 'merge'
    // });
  }
  ngOnDestroy(){
    this.heroDisplaySubscription.unsubscribe();
    this.trainingSuccessSubsription.unsubscribe();
    this.trainersSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
