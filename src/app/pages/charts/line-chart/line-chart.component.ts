import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AgCharts } from "ag-charts-angular";
// Chart Options Type Interface
import { AgChartOptions } from 'ag-charts-community';
import { Observable, Subject, filter, of, takeUntil } from "rxjs";
import { IOlympic } from "src/app/core/models/Olympic";
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
export class LineChartComponent implements OnInit,OnDestroy{
  private dataToDisplay!: IParticipation[] | undefined;
  private countryId!: string;
  private destroy$ = new Subject<void>();

  // Chart Options
  public chartOptions!: AgChartOptions;
  public olympics$: Observable<IOlympic[]> = of([]);

  ngOnInit(): void {
    this.countryId =  this.route.snapshot.params['id']
    this.loadData();
  }
  constructor(private olympicService: OlympicService,private router: Router, private route: ActivatedRoute) {
    this.chartOptions = {
      data: [],
      series: []
    }
  }

  private loadData (){
    this.olympicService.getOlympicById(+this.countryId).pipe().subscribe(olympic => {
      if(!olympic){
        this.router.navigate(['notFound'])
      } else {
        this.dataToDisplay = olympic?.participations
        if(this.dataToDisplay && this.dataToDisplay.length > 0){
          this.chartOptions = {
            // Data: Data to be displayed in the chart
            data: this.dataToDisplay,
            // Series: Defines which chart type and data to use
            series: [
              { type: 'line', xKey: 'year', yKey: 'medalsCount', yName: 'Nombre de medaille' },
          ],
          };
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}