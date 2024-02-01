import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'trips',
    loadChildren: () => import('./pages/trips/trips.module').then( m => m.TripsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'trips',
    pathMatch: 'full'
  },
  {
    path: 'trips/:id',
    loadChildren: () => import('./pages/trip-details/trip-details.module').then( m => m.TripDetailsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'create-trip',
    loadChildren: () => import('./pages/create-trip/create-trip.module').then( m => m.CreateTripPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
