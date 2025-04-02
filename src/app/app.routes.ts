import { Routes } from '@angular/router';
import { MissionListComponent } from '../missionlist/missionlist/missionlist.component';

export const routes: Routes = [
  {
    path: '',
    component: MissionListComponent, 
  },
  {
    path: 'missiondetails/:id',
    loadComponent: () => import('../missiondetails/missiondetails/missiondetails.component').then(m => m.MissionDetailsComponent)
  }
];
