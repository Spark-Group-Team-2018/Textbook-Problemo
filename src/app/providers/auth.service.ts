import { Injectable } from '@angular/core';

//Auth lib
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import * as crypto from 'crypto-js';

@Injectable()
export class AuthService {

  constructor(public af: AngularFireAuth) {

  }

  loginWithGoogle() {
    return this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    return this.af.auth.signOut();
  }

  getLoggedInUser() {
    var raw_user =  this.af.auth.currentUser;

    var user_promise = new Promise(function (resolve, reject) {
      if (raw_user == undefined) {
        resolve(null);
      }else {
        console.log(raw_user);

        raw_user.getIdToken(false).then (function (token_id) {

          var parsed_user = <User> {
            email: raw_user["email"],
            user_token: crypto.SHA256(raw_user.uid).toString();
          }

          resolve(parsed_user);

        });


      }
    })

    return user_promise;



  }

}
