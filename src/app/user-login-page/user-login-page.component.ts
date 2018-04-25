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
/**
Page in charge of logging the user in
**/

export class UserLoginPageComponent implements OnInit {

  /** User logged in variable **/
  public logged_in:boolean = false

  constructor(
    private user_db: UserDatabase,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private api: TextbookTradeSystemApi
  ) { }

  /**
  Checks if the user is logged in
  **/
  ngOnInit() {

    let that = this;

    this.checkLoggedIn().then (function (res) {
      that.logged_in = <boolean>res;
    });

  }

  /**
  checks if user logged in
  returns true or false
  **/
  checkLoggedIn() {

    var user = this.getLoggedInUser();

    let that = this;

    var logged_in_promise = new Promise (function (resolve, reject) {

      var social_logged_in:boolean = undefined;
      var db_logged_in:boolean = undefined;

      user.then (function (res) {

        social_logged_in = (res != null);

        return that.user_db.getUser();

      }).then (function (user:User) {

        db_logged_in = (user != null);


        resolve(db_logged_in);

      }).catch (function (err) {
        reject(err);
      })

    })

    return logged_in_promise;

  }

  /**
  not a test. Actually part of the thing
  logs the user in with google
  **/

  googleTestLogin() {
    let that = this;

    this.authService.loginWithGoogle().then ((data) => {
      alert ("Logged in!");

      return that.getLoggedInUser();

    }).then (function (user) {

      return that.api.newUser(<User>user);

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

      return that.api.getAuthUser(<string>authToken);

    }).then (function (authenticated_user) {
      console.log("Auth USER");
      console.log(authenticated_user);

      that.userLogin(<User>authenticated_user);

    }).catch ((err) => {
      console.log(err);
    })
  }

  /**
  Logs out the user via google and the local db
  **/
  userLogout() {

    this.authService.logout();
    this.user_db.clearUser();

    this.logged_in = false

  }

  /**
  Gets the logged in user from the google sign in
  **/
  getLoggedInUser() {
    var user = this.authService.getLoggedInUser();

    return user;
  }

  /**
  updates logged in user in the local db
  **/
  userLogin(user:User) {

    let that = this;

    that.logged_in = true;

    that.user_db.setUser(user).then (function (user:User) {

      if (user.first_name == "" || user.last_name == "" || user.phone_number == "000-000-0000") {
        that.router.navigate(['user-config']);
      }else {
        that.router.navigate(['/profile']);
      }

    }).catch (function (err) {
      console.log(err);
    })

  }


}
