import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IOlympic, IOlympicDisplay } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);
  private dataToTransfer = new BehaviorSubject<any>(undefined);
  getCurrentData = this.dataToTransfer.asObservable();
  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<IOlympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  SetContryData(data: IOlympicDisplay){
    this.dataToTransfer.next(data)
  }
}
