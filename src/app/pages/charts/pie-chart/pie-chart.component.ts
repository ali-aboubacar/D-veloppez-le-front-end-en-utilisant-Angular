import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Angular Chart Component
import { AgCharts } from 'ag-charts-angular';
// Chart Options Type Interface
import { AgChartOptions } from 'ag-charts-community';
import { Observable, of } from 'rxjs';
import { IOlympic, IOlympicDisplay } from 'src/app/core/models/Olympic';
import { IParticipation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';
// Angular Chart Component
@Component({
    selector: 'app-pie-chart',
    standalone: true,
    imports: [AgCharts],
    template:
    `<ag-charts
        style="height: 70vh; display:block"
        [options]="chartOptions">
     </ag-charts>`,
  })
  export class PieChartComponent implements OnInit{
    private displayedData: IOlympicDisplay[] = [];

    // Chart Options
    public chartOptions!: AgChartOptions;
    private olympicData!: IOlympic[];
    public olympics$: Observable<IOlympic[]> = of([]);
    ngOnInit(): void {
      this.olympics$ = this.olympicService.getOlympics();
      this.olympics$.pipe().subscribe(data => {
        this.olympicData = data
        this.loadChart();
      });
    }

    constructor(private router: Router, private olympicService: OlympicService) {

    }
  
    private loadChart(): void {
      this.olympicData.forEach((countryData:IOlympic) => {
        let totalAthletes = 0;
        let totalMedals = 0;

        countryData.participations.forEach((participation:IParticipation) => {
            totalMedals += participation.medalsCount;
            totalAthletes += participation.athleteCount;
        });
        this.displayedData.push({
            id: countryData.id,
            country: countryData.country,
            participations: countryData.participations,
            medalsAmount: totalMedals,
            allAthletes: totalAthletes
        })
      });

      this.chartOptions = {
        // Data: Data to be displayed in the chart
        data: this.displayedData,
        // Series: Defines which chart type and data to use
        series: [
            { 
                type: 'pie', 
                angleKey: 'medalsAmount',
                calloutLabelKey: 'country',
                listeners: {
                    nodeClick: (event) => {
                      this.router.navigate([`details/${event.datum.id}`]);
                    }
                } }
        ]
      };
    }
  }