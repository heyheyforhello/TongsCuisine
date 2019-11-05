import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { DbService } from '../db.service';

class Attack {
  date: String;
  time: String;
  location: String;
}

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css'],
  providers: [DbService]
})
export class PatientDetailComponent implements OnInit {
  public username : String = "";
  public attacks: Array<Attack> = [];

  public displayAttacks: Array<Attack> = [];
  public paginationLimit: number = 10;
  public pageCount: number = 0;
  public pageNumbers: Array<number> = [];

  constructor(private dbService: DbService, private route : ActivatedRoute) { }

  public ngOnInit(): void { }

  public ngAfterViewInit(): void {
    this.username = this.route.snapshot.paramMap.get('id');
    this.dbService.getPatientDetail(this.username).subscribe(res => {
      // TODO: Validate data
      let items = res['data'][0]['attack'];
      items = items.reverse();
      items.forEach(item => {
        let attack : Attack = {
          date: "",
          time: "",
          location: ""
        };
        attack.location = item.location;
        let time = item.time.split("T");
        attack.time = time[1].split('.')[0];
        attack.date = time[0];
        this.attacks.push(attack);
      });

      // Generate pagination
      this.pageCount = Math.floor(this.attacks.length / this.paginationLimit);
      for(let i = 0; i <= this.pageCount; i++) {
        this.pageNumbers.push(i);
      }
      this.initAttackList();
    });
  }

  initAttackList() {    
    let upperLimit = (1)*this.paginationLimit;
    let lowerLimit = (0)*this.paginationLimit;
    for(let i = 0; 
      i < this.attacks.length 
      && i < upperLimit
      && i >= lowerLimit;
      i++) {
        this.displayAttacks.push(this.attacks[i]);
    }
  }

  updateAttackList(pageNumber) {
    document.querySelectorAll(".page-btn").forEach(element => {
      element.classList.remove("btn-warning");
    });
    let selectedElement = document.querySelector(`#page-${pageNumber}`);
    console.log(selectedElement);
    selectedElement.classList.add("btn-warning");

    this.displayAttacks = [];
    let upperLimit = (pageNumber+1)*this.paginationLimit;
    let lowerLimit = (pageNumber)*this.paginationLimit;
    for(let i = pageNumber*this.paginationLimit; 
        i < this.attacks.length 
        && i < upperLimit
        && i >= lowerLimit;
        i++) {
      this.displayAttacks.push(this.attacks[i]);
    }
  }

  
}
