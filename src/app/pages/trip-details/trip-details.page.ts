import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { combineLatest } from 'rxjs';
import { ChecklistComponent } from 'src/app/components/checklist/checklist.component';
import { ChecklistItem } from 'src/app/models/checklist-item';
import { Trip } from 'src/app/models/trip';
import { User } from 'src/app/models/user';
import { TripsService } from 'src/app/services/trips.service';
import { UserService } from 'src/app/services/user.service';

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

  private users: User[] = [];

  constructor(
    private route: ActivatedRoute, 
    private tripsService: TripsService,
    private userService: UserService,
    private modalController: ModalController) { }

  ngOnInit() {
    let tripId = this.route.snapshot.paramMap.get('id');
    if (tripId) {
      combineLatest([this.tripsService.getTrip(tripId), this.userService.getUsers()]).subscribe(([trip, users]) => {
        this.trip = trip ?? this.trip;
        this.users = users;
        this.mapTravellerNames();
      })
    }
  }

  private mapTravellerNames() {
    this.trip.travellers = this.trip.travellers.map(traveller => {
      const user = this.users.find(u => u.userId === traveller.userId);
      return { userId: traveller.userId, name: user?.name, role: traveller.role };
    });
  }

  public async viewChecklist() : Promise<void> {
    const checklistUpdated = new EventEmitter<ChecklistItem[]>();
    checklistUpdated.subscribe(checklistItems => {
      this.trip.checklistItems = checklistItems;
      this.updateTrip();
    });

    const modal = await this.modalController.create({
      component: ChecklistComponent,
      componentProps: {
        checklistUpdated: checklistUpdated,
        checklistItems: this.trip.checklistItems
      }
    });
    modal.present();
  }

  public async addPhoto() : Promise<void> {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });
  
    if (!this.trip.photos)
      this.trip.photos = [];

    this.trip.photos.push(`data:image/png;base64,${image.base64String}`);
    this.updateTrip();
  }

  private updateTrip() : void {
    this.tripsService.updateTrip(this.trip.id, this.trip).subscribe(trip => {
      this.trip = trip;
      this.mapTravellerNames();
    });
  }

}
