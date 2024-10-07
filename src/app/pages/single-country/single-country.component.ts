import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { IOlympic, IOlympicDisplay } from "src/app/core/models/Olympic";
import { IParticipation } from "src/app/core/models/Participation";
import { OlympicService } from "src/app/core/services/olympic.service";

@Component({
    selector: 'app-single-country',
    templateUrl: './single-country.component.html',
    styleUrls: ['./single-country.component.scss']
})
export class SingleCountryComponent implements OnInit, OnDestroy {
    private totalMedalsField!: number;
    private totalAtheletesField!: number;
    private olympicField!: IOlympic | undefined;
    private destroy$ = new Subject<void>();
    private countryId: string;

    constructor(private olympicService: OlympicService, private route: ActivatedRoute){
        this.countryId =  this.route.snapshot.params['id']
    }
    ngOnInit(): void {
        this.olympicService.getOlympicById(+this.countryId).pipe().subscribe(
            data => {
                this.olympicField = data
                this.countTotal();
            }
        );
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
    private countTotal(): void{
        console.log('!!!!!!!!!!',this.olympicField)
        this.totalAtheletesField = 0;
        this.totalMedalsField = 0;
        this.olympicField?.participations.forEach((participation: IParticipation) => {
            this.totalAtheletesField += participation.athleteCount;
            this.totalMedalsField += participation.medalsCount;
        });
    }
    public get olympic(){
        return this.olympicField;
    }

    public get totalMedals(){
        return this.totalMedalsField;
    }

    public get totalAtheletes(){
        return this.totalAtheletesField;
    }
}