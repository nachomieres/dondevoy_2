import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation } from 'ionic-native';

import { FirebaseData } from './firebase-data';

import 'rxjs/add/operator/filter';

@Injectable()
export class LocationTracker {

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;
  public time: number = 0;

  constructor(public zone: NgZone, public firebaseData: FirebaseData) {

  }
  startTracking() {
    // Background Tracking
      let config = {
        /*desiredAccuracy: 10,
        stationaryRadius: 20,
        distanceFilter: 10,
        debug: true,
        interval: 2000*/
        desiredAccuracy:10,
        stationaryRadius: 20,
        distanceFilter: 30,
        maxLocations: 1000,

        // Android only section
        startForeground:true,
        locationProvider: 1,
        interval: 2000,
        fastestInterval: 2000,
        activitiesInterval: 10000,
        notificationTitle: 'dondeVoy',
        notificationText: 'Guardando ruta...',
        notificationIconColor: '#387ef5'
      };
      BackgroundGeolocation.configure((location) => {
        console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
        // Run update inside of Angular's zone
        this.zone.run(() => {
          this.lat = location.latitude;
          this.lng = location.longitude;
          this.time = location.timestamp;
          this.firebaseData.inserta(location);
        });
      }, (err) => {
        console.log(err);
      }, config);
      // Turn ON the background-geolocation system.
      BackgroundGeolocation.start();

      /*
      // Foreground Tracking
      let options = {
        frequency: 3000,
        enableHighAccuracy: true
      };
      this.watch = Geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
        console.log(position);
        // Run update inside of Angular's zone
        this.zone.run(() => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.time = position.timestamp;
          this.firebaseData.inserta(position.coords);
        });
      }); // this.wathch */
  } // startTracking

  stopTracking() {
    console.log('stopTracking');
      BackgroundGeolocation.stop();
      this.watch.unsubscribe();
  }
}
