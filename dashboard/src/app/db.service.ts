import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

  validateLogin(user: User){
    return this.http.post('/api/clinician/login',{
      username : user.username,
      password : user.password
    })
  }

  getPatientList() {
    return this.http.get('/api/patient');
  }

  getPatientDetail(username) {
    return this.http.post('api/patient-details', {
      username: username
    });
  }
}
