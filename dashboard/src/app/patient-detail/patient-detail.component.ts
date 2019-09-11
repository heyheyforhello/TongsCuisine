import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../db.service';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {
  public username = "";

  constructor(private dbService: DbService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('id');
    console.log(this.username);
    this.dbService.getPatientDetail(this.username).subscribe(res => {
      console.log(res);
    });
  }

}
