import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { IOlympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<IOlympic[]> = of([]);
  private destroy$ = new Subject<void>();
  private numberOfJoField!: number;
  private allDataField!: IOlympic[];
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.pipe(takeUntil(this.destroy$)).subscribe({
      next: value => {
        this.numberOfJoField = 0
        this.allDataField = value
        this.allDataField.forEach((x:IOlympic) => {
          if(x.participations.length > this.numberOfJoField){
            this.numberOfJoField = x.participations.length
          }
        })
      },
      error: err => console.error(err)
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public get numberOfJo(): number{
    return this.numberOfJoField;
  }
  public get allData(): IOlympic[]{
    return this.allDataField
  }
}
