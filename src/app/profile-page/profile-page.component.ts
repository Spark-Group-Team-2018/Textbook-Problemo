import { Component, OnInit } from '@angular/core';

//Import the API
import {TextbookTradeSystemApi} from "../../lib/TTS_Api";

//Import the models
import {Textbook} from '../../models/textbook';
import {Offer} from '../../models/offer';
import {User} from '../../models/user';

import {Router, ActivatedRoute, ParamMap, NavigationExtras} from '@angular/router';
import { Observable }         from 'rxjs/Observable';

//Import rxjs helpers for API
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  providers: [TextbookTradeSystemApi]
})
export class ProfilePageComponent implements OnInit {

  public user_offers:Offer[] = [];
  public user_textbooks:Textbook[] = [];
  public user_id:number = null;
  public user:User = null;

  constructor(
    private api: TextbookTradeSystemApi,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {

    let that = this;

    that.getUserId().then (function (id:number) {
      return that.api.getUserById(id);
    }).then (function (user:User) {
      that.user = user;

      that.api.getUserOffers(that.user.id).then (function (offers:Offer[]) {
        that.user_offers = offers
        console.log(offers);
      })

      //Retrieve the user created textbooks
      that.api.getUserTextbooks(that.user.id).then (function (textbooks: Textbook[]) {
        that.user_textbooks = textbooks;

      })

    }).catch (function (err) {
      console.log(err)
    })

  }

  getUserId() {

    let that = this;

    var user_id_promise = new Promise(function (resolve, reject) {
      that.route.queryParams
        .subscribe(params => {
          let user_id:number = Number(params["user_id"] || null)

          if (user_id == null) {
            reject("Unable to pull that");
          }

          resolve(user_id)
        })
    })

    return user_id_promise;

  }

  getOfferTextbook(offer:Offer) {

    return this.user_textbooks.find(function (textbook:Textbook) {
      return offer.textbook_id == textbook.id
    })
  }

  getTest() {

  }

}
