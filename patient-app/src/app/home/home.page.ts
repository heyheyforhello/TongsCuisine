import { Component } from '@angular/core';

import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

import { HttpClient } from '@angular/common/http';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [UniqueDeviceID]
})
export class HomePage {
  public username: String = "";
  public uuid: String = "";
  public logged: Boolean = false;

  constructor(private uniqueDeficeID: UniqueDeviceID, private httpClient : HttpClient, private storage: Storage) {
    this.storage.get('username').then((res) => {
      console.log(res);
    });
    // Try get the UUID but failed
    uniqueDeficeID.get().then(uuid => console.log(uuid));
  }

  public processForm() {
    this.httpClient.post('/api/add-patients', 
      {username: this.username, uuid: this.uuid}
    ).subscribe(res => {
      // set a username
      console.log(res);
      this.storage.set('username', this.username);
    });
    
    
  }

  public updateUsername(event) {
    this.username = event.target.value;
  }

  public updateUUID(event) {
    this.uuid = event.target.value;
  }

}
