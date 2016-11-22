import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import { BackgroundGeolocation } from 'ionic-native';

import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public eventList: any;

  constructor(public navCtrl: NavController, private platform: Platform) {
    this.eventList = firebase.database().ref('rutas/');

    platform.ready().then(() => {
      let config = {
        desiredAccuracy: 10,
        stationaryRadius: 20,
        distanceFilter: 30,
        debug: true, //  enable this hear sounds for background-geolocation life-cycle.
        stopOnTerminate: false, // enable this to clear background location settings when the app terminates
      };
      BackgroundGeolocation.configure((location) => {
        alert ('[js] BackgroundGeolocation callback:  ' + location.latitude + ',' + location.longitude);
        BackgroundGeolocation.finish(); // FOR IOS ONLY
      }, (error) => {
        alert ('BackgroundGeolocation error');
      }, config); // configuracion del BackgroundGeolocation

      // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
      Geolocation.getCurrentPosition().then(pos => {
        console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
        this.eventList.push('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
        BackgroundGeolocation.start();
      }); // Captura la posicion y una vez la consigue empieza a captuar en segundo plano
    }); // platform ready
  } // constructor

  arrancaBackground () {
    BackgroundGeolocation.start();
  }
  paraBackground () {
    BackgroundGeolocation.stop();
  }

} // Class home
