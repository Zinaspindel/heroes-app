import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Trainer } from "./trainer.model";
import { TrainerService } from "./trainer.service";

@Injectable({providedIn: 'root'})
export class TrainerResolver implements Resolve<Trainer[]> {
    constructor(private dataStorageService:DataStorageService, private trainerService:TrainerService){}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Trainer[]> | Promise<Trainer[]> | Trainer[] {
        const trainers = this.trainerService.getTrainers();
        if(trainers.length === 0){
            return this.dataStorageService.getTrainers();
        }
        return trainers;
        
    }
}