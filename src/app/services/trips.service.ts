import { Injectable } from '@angular/core';
import { Trip } from '../models/trip';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor(private http: HttpClient) { }

  public getTrips() : Observable<Trip[]> {
    return this.http.get(`${environment.baseUrl}/mocks/trips`) as Observable<Trip[]>;
  }

  public getTrip(id: string) : Observable<Trip> {
    return this.http.get(`${environment.baseUrl}/mocks/trips/${id}`) as Observable<Trip>;
  }
}
