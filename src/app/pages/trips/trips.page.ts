import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IonPopover } from '@ionic/angular';
import { filter } from 'rxjs';
import { Trip } from 'src/app/models/trip';
import { AuthService } from 'src/app/services/auth.service';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
})
export class TripsPage implements OnInit {
  @ViewChild('popover') public popover! : IonPopover;
  public trips: Trip[] = [];
  public isPopoverOpen = false;

  constructor(
    private tripsService: TripsService,
    private authService: AuthService,
    private router: Router) { 
  }

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.tripsService.getTrips().subscribe(trips => this.trips = trips);
    });
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isPopoverOpen = true;
  }

  public logout() {
    this.popover.dismiss();
    this.authService.logout();
  }

  public createTrip() {
    this.popover.dismiss();
    this.router.navigate(['create-trip']);
  }

}
