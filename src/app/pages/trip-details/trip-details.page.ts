import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { ChecklistComponent } from 'src/app/components/checklist/checklist.component';
import { ChecklistItem } from 'src/app/models/checklist-item';
import { Trip } from 'src/app/models/trip';
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

  constructor(
    private route: ActivatedRoute, 
    private tripsService: TripsService,
    private userService: UserService,
    private modalController: ModalController) { }

  ngOnInit() {
    let tripId = this.route.snapshot.paramMap.get('id');
    if (tripId) {
      this.tripsService.getTrip(tripId).subscribe(trip => this.trip = trip ?? this.trip);
      this.userService.getUsers().subscribe(users => {
        this.trip.travellers = this.trip.travellers.map(traveller => {
          const user = users.find(u => u.userId === traveller.userId);
          return {userId: traveller.userId, name: user?.name, role: traveller.role};
        })
      });
    }
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
  
    if (!this.trip.pictures)
      this.trip.pictures = [];

    this.trip.pictures.push(`data:image/png;base64,${image.base64String}`);
    this.updateTrip();
  }

  private updateTrip() : void {
    this.tripsService.updateTrip(this.trip.id, this.trip).subscribe(trip => this.trip = trip);
  }

}
