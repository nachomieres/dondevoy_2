import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { AuthData } from '../../providers/auth-data';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, private authData: AuthData) {}

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }

  login (e:string, p: string) {
    this.authData.loginUser(e,p).then( authData => {
        this.navCtrl.setRoot(HomePage);
      }, error => {
        alert (error);
      });
  }

}
