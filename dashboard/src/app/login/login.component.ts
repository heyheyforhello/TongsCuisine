import { Component } from '@angular/core';
import { DbService } from '../db.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ DbService ]
})
export class LoginComponent {

  public user : User;

  constructor(private dbService: DbService, private router: Router) {
    this.user = new User();
  }

  validateLogin() {
    if(this.user.username && this.user.password) {
      this.dbService.validateLogin(this.user).subscribe(result => {
        console.log('result is ', result);
        if(result['status'] === 'success') {
          this.router.navigate(['/patientList']);
        } else {
          alert('Wrong username password');
        }

      }, error => {
        console.log('error is ', error);
      });
    } else {
      alert('enter user name and password');
    }
  }

}



