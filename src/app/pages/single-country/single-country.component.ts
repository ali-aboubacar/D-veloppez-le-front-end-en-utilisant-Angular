import { Component, OnInit } from "@angular/core";
import { IOlympicDisplay } from "src/app/core/models/Olympic";
import { OlympicService } from "src/app/core/services/olympic.service";

@Component({
    selector: 'app-single-country',
    templateUrl: './single-country.component.html',
    styleUrls: ['./single-country.component.scss']
})
export class SingleCountryComponent implements OnInit {
    private singleCountryField!: IOlympicDisplay;
    constructor(private olympicService: OlympicService){
    }
    ngOnInit(): void {
        this.olympicService.getCurrentData.subscribe(data => this.singleCountryField = data);
    }

    public get singleCountry(){
        return this.singleCountryField;
    }
}