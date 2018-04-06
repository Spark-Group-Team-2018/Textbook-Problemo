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

//Backend API
import { TextbookTradeSystemApi} from '../../lib/TTS_Api';

@Component({
  selector: 'app-user-login-page',
  templateUrl: './user-login-page.component.html',
  styleUrls: ['./user-login-page.component.css'],
  providers: [UserDatabase, AuthService, AngularFireAuth, TextbookTradeSystemApi]
})
export class UserLoginPageComponent implements OnInit {

  public logged_in:boolean = false

  constructor(
    private user_db: UserDatabase,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private api: TextbookTradeSystemApi
  ) { }

  ngOnInit() {

    let that = this;

    this.checkLoggedIn().then (function (res) {
      that.logged_in = res;
    });

  }

  /** TODO add check logged in method **/
  checkLoggedIn() {

    var user = this.getLoggedInUser();

    let that = this;

    var logged_in_promise = new Promise (function (resolve, reject) {

      user.then (function (res) {

        if (res == null) {
          resolve(false);
        }elif (res != null) {
          resolve(true);
        }

      }).catch (function (err) {
        reject(err);
      })

    })

    return logged_in_promise;

  }

  googleTestLogin() {
    let that = this;

    this.authService.loginWithGoogle().then ((data) => {
      alert ("Logged in!");

      return that.getLoggedInUser();

    }).then (function (user) {

      return that.api.newUser(user);

    }).then (function (user:User) {

      if (user["id"] != undefined) {
        console.log("NEW USER");
        console.log(user);
      }else {
        console.log("user already exists");
        console.log(user);
      }

      return that.api.userAuth(user);

    }).then (function (authToken) {
      console.log(authToken);

      return that.api.getAuthUser(authToken);

    }).then (function (authenticated_user) {
      console.log("Auth USER");
      console.log(authenticated_user);

      that.userLogin(authenticated_user);

    }).catch ((err) => {
      console.log(err);
    })
  }

  googleLogout() {

    this.authService.logout();

  }

  getLoggedInUser() {
    var user = this.authService.getLoggedInUser();

    return user;
  }

  userLogin(user:User) {

    let that = this;


    that.user_db.setUser(user).then (function (res) {
      that.router.navigate(['/profile']);
    }).catch (function (err) {
      console.log(err);
    })

  }


}
