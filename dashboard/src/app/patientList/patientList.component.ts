import { Component } from '@angular/core';
import { DbService } from '../db.service';
import { Router } from '@angular/router';

class Patient {
  username: String;
  attack: Array<Object>;
  alert: Boolean;
  lastReport: String;
}

@Component({
  selector: 'app-patientList',
  templateUrl: './patientList.component.html',
  styleUrls: ['./patientList.component.css'],
  providers: [ DbService ]
})
export class patientListComponent {
  public patients : Array<Patient>;

  constructor(private dbService: DbService, private router: Router) { 
    // Get all patient
    this.dbService.getPatientList().subscribe(res => {
      this.patients = res['patient'];
      this.patients.forEach(patient => {
        // Get last record of attack
        let atkLength = patient.attack.length;
        let lastTime = new Date(patient.attack[atkLength-1]['time']);
        patient.lastReport = new Date(patient.attack[atkLength-1]['time']).toUTCString();

        let today = new Date();
        lastTime.setDate(lastTime.getDate()+2);
        // Determine if record is two days ago
        if (lastTime < today) {
          patient.alert = true;
        } else {
          patient.alert = false;
        }
        
      });
    });
  }

  getDetail(username) {
    console.log(username);
    this.router.navigate([`patient-detail/${username}`]);

  }
}
