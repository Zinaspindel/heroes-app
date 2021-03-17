import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hero } from '../../hero.model';
import { HeroesService } from '../../heroes.service';

@Component({
  selector: 'app-hero-display',
  templateUrl: './hero-display.component.html',
  styleUrls: ['./hero-display.component.css']
})
export class HeroDisplayComponent implements OnInit {
  @Input() hero!: Hero;
  animationSubscription:Subscription;
  showAnimation: boolean = false;

  constructor(private heroesSerivce : HeroesService) { }

  ngOnInit(): void {
    this.animationSubscription = this.heroesSerivce.trainingSuccessChanged.subscribe((trainingStatus)=>{
      if(trainingStatus){
        this.showAnimation = true;
        setTimeout(()=>{
          this.showAnimation = false;
        },1200)
      }
    })
  }
  
  trainHero(hero:Hero){
    this.heroesSerivce.trainHero(hero);
  }
}
