import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { IOlympicDisplay } from "src/app/core/models/Olympic";
import { OlympicService } from "src/app/core/services/olympic.service";

@Component({
    selector: 'app-single-country',
    templateUrl: './single-country.component.html',
    styleUrls: ['./single-country.component.scss']
})
export class SingleCountryComponent implements OnInit, OnDestroy {
    private singleCountryField!: IOlympicDisplay;
    private destroy$ = new Subject<void>();

    constructor(private olympicService: OlympicService){
    }
    ngOnInit(): void {
        this.olympicService.getCurrentData
          .pipe(takeUntil(this.destroy$))
          .subscribe(data => this.singleCountryField = data);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public get singleCountry(){
        return this.singleCountryField;
    }
}