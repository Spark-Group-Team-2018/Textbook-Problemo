import { Component, OnInit } from '@angular/core';

//Import the API
import {TextbookTradeSystemApi} from "../../lib/TTS_Api";

//Import the models
import {Textbook} from '../../models/textbook';
import {Offer} from '../../models/offer';
import {User} from '../../models/user';
import {PendingOffer} from '../../models/pendingoffer';

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

  /** OPTIMIZE ME **/
  public all_offers:Offer[] = [];
  public all_textbooks:Textbook[] = [];
  /** END OPTIMIZE **/

  public seller_pending_offers: PendingOffer[] = [];

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

      that.api.getUserPendingOffers(that.user.id).then (function (pending_offers:PendingOffer[]) {
        that.seller_pending_offers = pending_offers
        console.log(that.seller_pending_offers);
      })

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

      if (err == "invalid_user") {
        that.router.navigate(["/"]);
      }

    })

    /** OPTIMIZE ME **/
    that.api.getOffers().then (function (offers:Offer[]) {
      that.all_offers = offers;
    }).catch (function (err) {
      console.log(err);
    })

    that.api.getTextbooks().then(function (textbooks:Textbook[]) {
      that.all_textbooks = textbooks;
    }).catch (function (err) {
      console.log(err);
    })

    /** END OPTIMIZE **/

  }

  getUserId() {

    let that = this;

    var user_id_promise = new Promise(function (resolve, reject) {
      that.route.queryParams
        .subscribe(params => {
          let user_id:number = Number(params["user_id"]) || null;

          if (user_id == null) {
            reject("invalid_user");
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


  /**
  OPTIMIZE ME
  ;; These are helper functions for rendering pending offers from sellers
  **/

  getTextbookByOffer(offer_id:number) {

    let that = this;

    var textbook:Textbook = this.all_textbooks.find(function (textbook: Textbook) {
      var offer = that.all_offers.find(function (offer: Offer) {
        return offer.id = offer_id;
      })

      return textbook.id == offer.textbook_id;

    })

    return textbook;

  }

  getPendingOfferSellerOffer(offer_id) {
    let that = this;

    var offer:Offer = this.all_offers.find(function (offer: Offer) {
      return offer.id == offer_id
    })

    return offer;

  }

  getPendingOfferSeller() {

  }

  // OPTIMIZE END


}
