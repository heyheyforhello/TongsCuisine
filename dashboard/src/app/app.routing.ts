import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { patientListComponent } from './patientList/patientList.component';

export const AppRoutes: Routes = [
  { path: '', component: LoginComponent, pathMatch:'full'},
  { path: 'patientList', component: patientListComponent }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);


