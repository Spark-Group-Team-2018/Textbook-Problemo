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
    this.user_db.getUserId().then (function (user_id:number) {
      console.log('USER: ' + user_id);
    }).catch (function (err) {
      console.log(err);
    })
  }

}
