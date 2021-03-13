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

  constructor(private heroesSerivce : HeroesService) { }

  ngOnInit(): void {
  }
  
  trainHero(hero:Hero){
    this.heroesSerivce.trainHero(hero);
  }
}
