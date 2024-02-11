import { Injectable } from '@angular/core';
import { Trip } from '../models/trip';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor(private http: HttpClient) { }

  public getTrips() : Observable<Trip[]> {
    return this.http.get(`${environment.baseUrl}/trips`) as Observable<Trip[]>;
  }

  public getTrip(id: string) : Observable<Trip> {
    return this.http.get(`${environment.baseUrl}/trips/${id}`) as Observable<Trip>;
  }

  public updateTrip(id: string, trip: Trip): Observable<Trip> {
    return this.http.put(`${environment.baseUrl}/trips/${id}`, trip) as Observable<Trip>;
  }

  public createTrip(trip: Trip): Observable<Trip> {
    return this.http.post(`${environment.baseUrl}/trips`, trip) as Observable<Trip>;
  }
}
