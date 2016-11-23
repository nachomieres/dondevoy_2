import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import { BackgroundGeolocation } from 'ionic-native';

import { LoginPage } from '../login/login';
import { AuthData } from '../../providers/auth-data';

import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user:any = firebase.auth().currentUser;
  // hasta que no consigue la primera posicion con el getCurrentPosition no permite posiciones en background.
  permisoBackground: boolean = false;

  constructor(public navCtrl: NavController, private platform: Platform, private authData: AuthData) {
    console.log (this.user);
    platform.ready().then(() => {

      // Configuracion del BackgroundGeolocation
      let config = {
        desiredAccuracy: 10,
        stationaryRadius: 20,
        distanceFilter: 30,
        notificationTitle: 'Dondevoy',
        notificationText: 'Guardando ruta...',
        debug: true, //  enable this hear sounds for background-geolocation life-cycle.
        stopOnTerminate: false, // enable this to clear background location settings when the app terminates
      };
      BackgroundGeolocation.configure((location) => {
        // cada vez que obtiene una posicion, la guarda en la base de datos
        firebase.database().ref('/test').push ({
            latitud: location.latitude,
            longitud: location.longitude
          });
        BackgroundGeolocation.finish(); // FOR IOS ONLY
      }, (error) => {
        alert ('BackgroundGeolocation error');
      }, config); // configuracion del BackgroundGeolocation

      // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
      Geolocation.getCurrentPosition().then(pos => {
        console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
        //BackgroundGeolocation.start();
        this.permisoBackground = true;
      }); // Captura la posicion y una vez la consigue empieza a captuar en segundo plano
    }); // platform ready
  } // constructor

  arrancaBackground () {
    BackgroundGeolocation.start();
  }
  paraBackground () {
    BackgroundGeolocation.stop();
  }
  logOut () {
    this.authData.logoutUser().then(() => {
    this.navCtrl.setRoot(LoginPage);
  });
  }

} // Class home
