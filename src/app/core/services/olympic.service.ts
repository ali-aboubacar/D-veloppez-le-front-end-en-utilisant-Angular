import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { IOlympic, IOlympicDisplay } from '../models/Olympic';
import { ToastService } from './toast.service';
import { errorType } from '../models/toast';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<IOlympic[]>([]);
  constructor(private http: HttpClient, private toastService: ToastService) {}

  loadInitialData() {
    return this.http.get<IOlympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error) => {
        // TODO: improve error handling
        this.toastService.showToast(error.message, errorType(error))
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return [];
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getOlympicById(id: number): Observable<IOlympic | undefined>{
    return this.olympics$.pipe(
      filter((olympic: IOlympic[]) => olympic.length > 0 ),
      map((olympics: IOlympic[]) => olympics.find(olympic => olympic.id === id))
    )
  }
}
