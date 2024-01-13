import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trip } from 'src/app/models/trip';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.page.html',
  styleUrls: ['./trip-details.page.scss'],
})
export class TripDetailsPage implements OnInit {
  public trip: Trip = {
    id: '',
    title: '',
    budget: 0,
    finalDestination: { name: '', date: new Date() },
    startDestination: { name: '', date: new Date() },
    travellers: []
  }

  constructor(private route: ActivatedRoute, private tripsService: TripsService) { }

  ngOnInit() {
    let tripId = this.route.snapshot.paramMap.get('id');
    if (tripId) {
      this.tripsService.getTrip(tripId).subscribe(trip => this.trip = trip ?? this.trip);
    }
  }

}
