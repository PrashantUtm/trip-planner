import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router
    ) {
    this.tripForm = this.formBuilder.group({
      title: ['', Validators.required],
      budget: ['', Validators.required],
      startDestination: this.formBuilder.group({
        name: ['', Validators.required],
        date: ['', Validators.required]
      }),
      finalDestination: this.formBuilder.group({
        name: ['', Validators.required],
        date: ['', Validators.required]
      }),
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
      date: ['', Validators.required]
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
}
