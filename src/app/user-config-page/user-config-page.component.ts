import { Component, OnInit } from '@angular/core';

//Import the User model
import {User} from '../../models/user';

//Import the api
import {TextbookTradeSystemApi} from '../../lib/TTS_Api';

//Import the user database
import {UserDatabase} from '../../lib/User_Database';

//Import routing
import {Router, ActivatedRoute, ParamMap, NavigationExtras} from '@angular/router';
import { Observable }         from 'rxjs/Observable';

//Import rxjs helpers for API
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-user-config-page',
  templateUrl: './user-config-page.component.html',
  styleUrls: ['./user-config-page.component.css'],
  providers: [TextbookTradeSystemApi, UserDatabase]
})

/**
business logic that helps configure the user
**/

export class UserConfigPageComponent implements OnInit {

  /** Updated User info **/
  public user_update:User = null;

  constructor(
    private api: TextbookTradeSystemApi,
    private db: UserDatabase,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  /** Gets the logged in user
  if not logged in, go back to login page
  **/
  ngOnInit() {

    let that = this;

    this.db.getUser().then (function (user:User) {

      if (user == null) {
        that.goHomeBoi();
      }

      that.user_update = user;

    })


  }

  /**
  Updates the user with the updated data via the backend api
  **/
  updateUser() {

    console.log("Updating user!");

    let that = this;

    var authToken:string = this.user_update["authToken"];

    if (this.user_update.first_name == "" || this.user_update.last_name == "" || this.user_update.phone_number == "000-000-0000" || this.user_update.phone_number == "") {
      alert("Fill out the forms boi!");
      return
    }

    that.api.updateAuthUser(this.user_update, authToken).then (function (updatedUser:User) {
      alert("user updated!");
      let updated_user:User = updatedUser;

      updated_user["authToken"] = authToken;

      return that.db.setUser(updated_user);

    }).then (function (user:User) {
      that.goToProfile();
    }).catch (function (err) {
      console.log(err);
    })

  }

  //Sends that non-loggedin user home
  goHomeBoi() {
    this.router.navigate([''])
  }

  //Sends to profile
  goToProfile() {
    this.router.navigate(['/profile'])
  }

}
