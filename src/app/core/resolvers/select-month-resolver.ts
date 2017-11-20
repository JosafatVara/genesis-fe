import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { MonthSelectorService } from "../utils/month-selector/month-selector.service";

@Injectable()
export class SelectMonthResolver implements Resolve<{month: number, year:number}>{
    
    constructor(private monthSelector: MonthSelectorService){

    }

    resolve(): Observable<{ month: number; year: number; }>{
        return this.monthSelector.selectMonth().first();
    }
}
