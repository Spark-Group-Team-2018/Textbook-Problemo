import { Component, OnInit } from '@angular/core';

/** User Database System **/
import {UserDatabase} from '../../lib/User_Database';
import {User} from '../../models/user';

/** Routing system **/
import {Router, ActivatedRoute, ParamMap, NavigationExtras} from '@angular/router';

/** Auth system **/
import {AuthService} from '../providers/auth.service';

//Auth lib
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-user-login-page',
  templateUrl: './user-login-page.component.html',
  styleUrls: ['./user-login-page.component.css'],
  providers: [UserDatabase, AuthService, AngularFireAuth]
})
export class UserLoginPageComponent implements OnInit {

  constructor(
    private user_db: UserDatabase,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {

  }

  /** TODO add check logged in method **/
  checkLoggedIn() {

  }

  googleTestLogin() {
    this.authService.loginWithGoogle().then ((data) => {
      alert ("Logged in!");
      console.log(data);
    }).catch ((err) => {
      alert("ERRR");
    })
  }

  userLogin(user_id:number) {

    let that = this;

    that.user_db.setUserId(user_id).then (function (res) {
      that.router.navigate(['/profile']);
    }).catch (function (err) {
      console.log(err);
    })

  }

}
