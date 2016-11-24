import { Injectable } from '@angular/core';

import firebase from 'firebase';

/*
  Generated class for the FirebaseData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FirebaseData {
  ref: any =   firebase.database().ref('/test');
  constructor() {
    console.log('Hello FirebaseData Provider');
  }

  inserta (location: any) {
    this.ref.push ({
            latitud: location.latitude,
            longitud: location.longitude
          });
  }

}
