import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IOlympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<IOlympic[]> = of([]);
  private allDataField!: IOlympic[];
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe({
      next: value => {
        console
        this.allDataField = value
      },
      error: err => console.error(err)
    })
  }

  public get allData(): IOlympic[]{
    return this.allDataField
  }
}
