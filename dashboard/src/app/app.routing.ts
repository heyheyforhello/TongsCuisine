import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { patientListComponent } from './patientList/patientList.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';

export const AppRoutes: Routes = [
  { path: '', component: LoginComponent, pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'patient-list', component: patientListComponent },
  { path: 'patient-detail/:id', component: PatientDetailComponent}
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);


