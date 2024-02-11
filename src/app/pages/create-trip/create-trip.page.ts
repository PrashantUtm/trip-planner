import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { Geolocation } from '@capacitor/geolocation';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { TripsService } from 'src/app/services/trips.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.page.html',
  styleUrls: ['./create-trip.page.scss'],
})
export class CreateTripPage implements OnInit {
  public tripForm: FormGroup;
  public users: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tripsService: TripsService,
    private userService: UserService,
    private router: Router,
    private nativeGeocoder: NativeGeocoder
    ) {
    this.tripForm = this.formBuilder.group({
      title: ['', Validators.required],
      budget: ['', Validators.required],
      startDestination: this.createDestination(),
      finalDestination: this.createDestination(),
      travellers: this.formBuilder.array<FormGroup>([this.createTraveller(this.authService.getUserId() as string, 'Organizer')]),
      otherDestinations: this.formBuilder.array<FormGroup>([this.createDestination()])
    });
   }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  public createNewTrip() : void {
    console.log(this.tripForm.value);
    this.tripForm.markAllAsTouched();
    if (this.tripForm.valid) {
      const newTrip = this.tripForm.value;
      newTrip.travellers.pop();
      this.tripsService.createTrip(newTrip).subscribe(newTrip => {
        if (newTrip) {
          this.tripForm.reset();
          this.router.navigate(['/trips']);
        }
      })
    }
  }

  public createTraveller(userId: string = '', role: string = '') : FormGroup {
    return this.formBuilder.group({
      userId: [ userId ],
      role: [ role ]
    })
  }

  public addNewTraveller() : void {
    const travellersFormArray = this.tripForm.controls['travellers'] as FormArray;
    travellersFormArray.controls.push(this.createTraveller());
  }

  public getTravellers() : FormGroup[] {
    const travellersFormArray = this.tripForm.controls['travellers'] as FormArray;
    return travellersFormArray.controls as FormGroup[];
  }

  public createDestination() : FormGroup {
    return this.formBuilder.group({
      name: [''],
      date: ['', Validators.required],
      latitude: [''],
      longitude: ['']
    });
  }

  public getDestinations() : FormGroup[] {
    const destinationsFormArray = this.tripForm.controls['otherDestinations'] as FormArray;
    return destinationsFormArray.controls as FormGroup[];
  }

  public addDestination() : void {
    const array = this.tripForm.controls['otherDestinations'] as FormArray;
    array.controls = [...array.controls, this.createDestination()];
  }

  public async setCurrentLocation(controlName: string) : Promise<void> {
    const coordinates = await Geolocation.getCurrentPosition();
    const longitude = coordinates.coords.longitude;
    const latitude = coordinates.coords.latitude;

    this.tripForm.controls[controlName].patchValue({ latitude: latitude, longitude: longitude });

    const result = await this.nativeGeocoder.reverseGeocode(latitude, longitude);
    const firstResult = result[0];
    const destinationName = `${firstResult.locality} ${firstResult.countryName}`;

    this.tripForm.controls[controlName].patchValue({ name: destinationName });
  }
}
