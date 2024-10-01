import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AgCharts } from "ag-charts-angular";
// Chart Options Type Interface
import { AgChartOptions } from 'ag-charts-community';
import { Subject, takeUntil } from "rxjs";
import { IParticipation } from "src/app/core/models/Participation";
import { OlympicService } from "src/app/core/services/olympic.service";

@Component({
    selector: 'app-line-chart',
    standalone: true,
    imports: [AgCharts],
    template:
    `<ag-charts
        style="height: 70vh; display:block"
        [options]="chartOptions">
     </ag-charts>`
})
export class LineChartComponent implements OnDestroy{
  private dataToDisplay!: IParticipation[];
  private destroy$ = new Subject<void>();

  // Chart Options
  public chartOptions: AgChartOptions;
  constructor(private olympicService: OlympicService, private router: Router) {
    this.olympicService.getCurrentData.pipe(takeUntil(this.destroy$)).subscribe(data => {
      if(data.country == ''){
        this.router.navigate(['notFound'])
      }else{
        this.dataToDisplay = data.participations
      }
    });
    this.chartOptions = {
      // Data: Data to be displayed in the chart
      data: this.dataToDisplay,
      // Series: Defines which chart type and data to use
      series: [
        { type: 'line', xKey: 'year', yKey: 'athleteCount', yName: "Nombre d'athletes" },
        { type: 'line', xKey: 'year', yKey: 'medalsCount', yName: 'Nombre de medaille' },
    ],
    };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}