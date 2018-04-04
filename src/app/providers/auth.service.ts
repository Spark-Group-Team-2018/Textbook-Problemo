import { Injectable } from '@angular/core';

//Auth lib
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  constructor(public af: AngularFireAuth) { }

  loginWithGoogle() {
    return this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    return this.af.auth.signOut();
  }

}
