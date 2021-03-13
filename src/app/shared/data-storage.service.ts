import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Trainer } from "../trainer/trainer.model";
import { TrainerService } from "../trainer/trainer.service";
import {  tap } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";


@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http:HttpClient, private trainerService:TrainerService){}
    
    storeTrainers(){
        const trainers = this.trainerService.getTrainers();
        this.http.put('https://heroes-c1286-default-rtdb.europe-west1.firebasedatabase.app/trainers.json',trainers)
        .subscribe(response => {
        });
    }
    storeTrainer(trainer:Trainer){
        this.http.post('https://heroes-c1286-default-rtdb.europe-west1.firebasedatabase.app/trainers.json',trainer)
        .subscribe( resData => {
            this.trainerService.updateTrainers();
        })
    }
    getTrainers(){
        return this.http
        .get<Trainer[]>(
            'https://heroes-c1286-default-rtdb.europe-west1.firebasedatabase.app/trainers.json'
        ).pipe(tap(trainers =>{
            this.trainerService.setTrainers(trainers);
        }))
    }
}