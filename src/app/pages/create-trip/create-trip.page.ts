import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.page.html',
  styleUrls: ['./create-trip.page.scss'],
})
export class CreateTripPage implements OnInit {
  public tripForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tripsService: TripsService,
    private router: Router
    ) {
    this.tripForm = this.formBuilder.group({
      title: [''],
      budget: [''],
      startDestination: this.formBuilder.group({
        name: [''],
        date: ['']
      }),
      finalDestination: this.formBuilder.group({
        name: [''],
        date: ['']
      }),
      travellers: this.formBuilder.array<FormGroup>([]),
      otherDestinations: this.formBuilder.array<FormGroup>([])
    });
   }

  ngOnInit() {
    const travellersFormArray = this.tripForm.controls['travellers'] as FormArray;
    travellersFormArray.controls.push(this.formBuilder.group({
      userId: [ this.authService.getUserId() ],
      role: [ 'Organizer' ]
    }));
  }

  public createNewTrip() : void {
    console.log(this.tripForm.value);
    this.tripsService.createTrip(this.tripForm.value).subscribe(newTrip => {
      if (newTrip) {
        this.tripForm.reset();
        this.router.navigate(['/trips']);
      }
    })
  }

}
