import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
//angular fire para firebase
import { AngularFireModule } from 'angularfire2';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

export const firebaseConfig = {
  apiKey: "AIzaSyBSIJ5QyOh90Q92wQG2C4BCnZp8mmtECCo",
  authDomain: "dondeando.firebaseapp.com",
  databaseURL: "https://dondeando.firebaseio.com",
  storageBucket: "project-6272698264410432201.appspot.com",
  messagingSenderId: "300387384343"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: []
})
export class AppModule {}
