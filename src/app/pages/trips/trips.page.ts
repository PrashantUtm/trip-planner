import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
})
export class TripsPage implements OnInit {
  public trips: Trip[] = [];

  constructor(private tripsService: TripsService) { 
  }

  ngOnInit() {
    this.trips = this.tripsService.getTrips();
  }

}
