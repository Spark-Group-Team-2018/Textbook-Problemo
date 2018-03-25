import { Component, OnInit } from '@angular/core';

/** Import the User Login Database **/

import {UserDatabase} from '../../lib/User_Database';

/** Database end **/

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [UserDatabase]
})
export class NavbarComponent implements OnInit {

  constructor(
    private user_db: UserDatabase
  ) { }

  ngOnInit() {
    let that = this;

    this.user_db.userLoggedIn().then (function (result:boolean) {

      if (result == false) {
        console.log("Logging in...")
        return that.user_db.setUserId(1);
      } else if (result == true) {
        return that.user_db.getUserId();
      }

    }).then (function (user_id:number) {
      console.log("Logged In w/ user_id: " + user_id);
    }).catch (function (err) {
      console.log(err);
    })
  }

}
