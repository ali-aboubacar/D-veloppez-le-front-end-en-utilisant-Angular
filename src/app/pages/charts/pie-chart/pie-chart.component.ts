import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Angular Chart Component
import { AgCharts } from 'ag-charts-angular';
// Chart Options Type Interface
import { AgChartOptions } from 'ag-charts-community';
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
  export class PieChartComponent implements OnInit {
    private displayedData: IOlympicDisplay[] = [];
    // Chart Options
    public chartOptions: AgChartOptions;
    @Input() allDataInput!: IOlympic[];

    ngOnInit(): void {
      this.loadChart();
    }
    constructor(private router: Router, private olympicService: OlympicService) {
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
                      this.olympicService.SetContryData(event.datum)
                      this.router.navigate([`${event.datum.id}`]);
                    }
                } }
        ]
      };
    }

    private loadChart(): void {
      this.allDataInput.forEach((countryData:IOlympic) => {
        let totalMedals = 0;

        countryData.participations.forEach((participation:IParticipation) => {
            totalMedals += participation.medalsCount;
        });
        this.displayedData.push({
            id: countryData.id,
            country: countryData.country,
            participations: countryData.participations,
            medalsAmount: totalMedals
        })
      });
    }
  }