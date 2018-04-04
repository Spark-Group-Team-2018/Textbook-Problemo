import { Component, OnInit } from '@angular/core';

/** User Database System **/
import {UserDatabase} from '../../lib/User_Database';

/** Routing system **/
import {Router, ActivatedRoute, ParamMap, NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-user-login-page',
  templateUrl: './user-login-page.component.html',
  styleUrls: ['./user-login-page.component.css'],
  providers: [UserDatabase]
})
export class UserLoginPageComponent implements OnInit {

  constructor(
    private user_db: UserDatabase,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

  }

  googleTestLogin() {

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
