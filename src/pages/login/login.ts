import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

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
  public loginForm;
  public submitAttempt = false;

  constructor(public navCtrl: NavController, private authData: AuthData, private formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  login () {
    this.submitAttempt = true;
    if (!this.loginForm.valid){
      alert ('error en el formulario');
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then( authData => {
        this.navCtrl.setRoot(HomePage);
      }, error => {
        console.log (error.message);
      }); // then
    } //else
  } // login
}
