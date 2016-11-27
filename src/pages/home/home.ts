import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';

import { LoginPage } from '../login/login';

import { AuthData } from '../../providers/auth-data';
import { LocationTracker } from '../../providers/location-tracker';

import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user:any = firebase.auth().currentUser;
  // hasta que no consigue la primera posicion con el getCurrentPosition no permite posiciones en background.
  permisoBackground: boolean = false;

  constructor(public navCtrl: NavController, public platform: Platform,
              public authData: AuthData, public locationTracker: LocationTracker) {
    console.log (this.user);
    platform.ready().then(() => {

    }); // platform ready
  } // constructor

  arrancaBackground () {
    console.log ('Iniciando tracking');
    this.locationTracker.startTracking();
  }
  paraBackground () {
    console.log ('tracking parado');
    this.locationTracker.stopTracking();
  }

  logOut () {    
    this.authData.logoutUser().then(() => {
      this.navCtrl.setRoot(LoginPage);
    });
  }

} // Class home
