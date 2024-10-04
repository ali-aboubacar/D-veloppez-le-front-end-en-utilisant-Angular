import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IOlympic, IOlympicDisplay } from '../models/Olympic';
import { ToastService } from './toast.service';
import { errorType } from '../models/toast';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<IOlympic[]>([]);
  private dataToTransfer = new BehaviorSubject<IOlympicDisplay | undefined>(undefined);
  getCurrentData = this.dataToTransfer.asObservable();
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

  SetContryData(data: IOlympicDisplay){
    this.dataToTransfer.next(data)
  }
}
