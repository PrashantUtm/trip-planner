import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TripDetailsPageRoutingModule } from './trip-details-routing.module';

import { TripDetailsPage } from './trip-details.page';
import { DestinationComponent } from 'src/app/components/destination/destination.component';
import { ChecklistComponent } from 'src/app/components/checklist/checklist.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TripDetailsPageRoutingModule
  ],
  declarations: [TripDetailsPage, DestinationComponent, ChecklistComponent]
})
export class TripDetailsPageModule {}
