import { Injectable } from '@angular/core';

import firebase from 'firebase';

/*
  Generated class for the FirebaseData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FirebaseData {
  fireAuth = firebase.auth();
  ref: any;
  constructor() {
    console.log('Hello FirebaseData Provider');
    console.log (this.fireAuth.currentUser.uid);
    this.ref = firebase.database().ref(this.fireAuth.currentUser.uid);
  }

  inserta (location: any) {
    this.ref.push ({
            latitud: location.latitude,
            longitud: location.longitude
          });
  }

}
