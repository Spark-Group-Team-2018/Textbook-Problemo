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

// Import the User Database
import {UserDatabase} from '../../lib/User_Database';

//Import rxjs helpers for API
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  providers: [TextbookTradeSystemApi, UserDatabase]
})
export class ProfilePageComponent implements OnInit {

  public user_offers:Offer[] = [];
  public user_textbooks:Textbook[] = [];

  /** OPTIMIZE ME **/
  public all_offers:Offer[] = [];
  public all_textbooks:Textbook[] = [];
  public all_users:User[] = [];
  /** END OPTIMIZE **/

  public seller_pending_offers: PendingOffer[] = [];
  public buyer_pending_offers: PendingOffer[] = [];

  public user_id:number = null;

  public user:User = null;
  constructor(
    private api: TextbookTradeSystemApi,
    private route: ActivatedRoute,
    private router: Router,
    private user_db: UserDatabase
  ) { }

  ngOnInit() {

    let that = this;

    that.getUser().then (function (user:User) {
      that.user = user;
      console.log(that.user);

      /** FIXME HELLAS **/
      that.refreshUserData(that.user);

    }).catch (function (err) {
      console.log(err)

      if (err == "invalid_user") {
        that.router.navigate(["/"]);
      }

    })

    that.refreshGenData();

  }

  //Retrieves all essential data

  refreshGenData() {
    let that = this;

    /** OPTIMIZE ME **/
    that.api.getOffers().then (function (offers:Offer[]) {
      that.all_offers = offers;
      console.log(that.all_offers);
    }).catch (function (err) {
      console.log(err);
    })

    that.api.getUsers().then(function (users: User[]) {
      that.all_users = users;
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

  refreshUserData(user:User) {
    let that = this;

    var user_auth = user["authToken"]

    that.api.getSellerPendingOffers(user.id).then (function (pending_offers:PendingOffer[]) {
      that.seller_pending_offers = pending_offers
      console.log(that.seller_pending_offers)
    })

    that.api.getBuyerPendingOffers(user.id).then (function (pending_offers:PendingOffer[]) {

      that.buyer_pending_offers = pending_offers;
      console.log("Buyer Pending Offers")
      console.log(that.buyer_pending_offers);

    });


    that.api.getUserOffers(user.id).then (function (offers:Offer[]) {
      that.user_offers = offers
    })

    //Retrieve the user created textbooks
    that.api.getUserTextbooks(user.id).then (function (textbooks: Textbook[]) {
      that.user_textbooks = textbooks;

    })


  }

  /**

  UPDATE User functions

  **/


  updateUserTextbook(textbook_id:number) {

    this.router.navigate(['/create-textbook'], {queryParams: {mode: 'update', id: textbook_id}});

  }

  updateUserOffer(offer_id:number) {

    this.router.navigate(['/create-offer'], {queryParams : {mode: 'update', id: offer_id}});

  }

  /**

  DELETE User functions

  **/

  /**

  checks if the user_id corresponds to the textbook user_id
  if so, delete

  **/

  deleteUserTextbook(user_textbook_id:number) {

    alert("DELETE Textbook " + user_textbook_id.toString());

    let that = this;

    /** Validation Code HERE FIXME **/

    /** Validation code end **/

    that.api.deleteTextbook(user_textbook_id, that.user["authToken"]).then (function (res) {
      console.log(res);

      that.refreshUserData(that.user);
      that.refreshGenData();

    }).catch (function (err) {
      console.log(err);
    })

  }

  /**

  checks if the textbook the offer points to corresponds to the user_id
  if so, delete

  **/

  deleteUserOffer(user_offer_id:number) {

    alert("DELETE Offer " + user_offer_id.toString());

    let that = this;

    /** Validation Code HERE FIXME **/

    /** Validation code end **/

    that.api.deleteOffer(user_offer_id, that.user["authToken"]).then (function (res) {
      console.log(res);

      that.refreshUserData(that.user);
      that.refreshGenData();

    }).catch (function (err) {
      console.log(err);
    })

  }

  /**

  checks if the person is the buyer

  if so, then delete the PendingOffer

  **/

  deleteSellerPendingOffer(pending_offer_id:number) {

    alert("DELETE Seller Pending Offer " + pending_offer_id.toString());

    /** Validation Code HERE FIXME **/

    /** Validation code end **/

    this.deletePendingOffer(pending_offer_id);

  }

  /**

  checks if the offer belongs to the seller

  if so, then delete the PendingOffer

  **/

  deleteBuyerPendingOffer(pending_offer_id:number) {

    alert("DELETE Buyer Pending Offer " + pending_offer_id.toString());

    /** Validation Code HERE FIXME **/

    /** Validation code end **/

    this.deletePendingOffer(pending_offer_id);

  }

  /**
    Deletes the pending offer
  **/

  deletePendingOffer(pending_offer_id:number) {

    let that = this;

    that.api.deletePendingOffer(pending_offer_id).then (function (res) {
      that.refreshUserData(that.user);
      that.refreshGenData();
    }).catch(function (err) {
      console.log(err);
    })

  }

  /**
  Retrieves the Id of the User
  **/

  getUserId() {

    let that = this;

    var user_id_promise = that.user_db.getUserId();

    return user_id_promise;

  }

  getUser() {
    let that = this;

    var user_promise = that.user_db.getUser();

    return user_promise;
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
        return offer.id == offer_id;
      })

      return textbook.id == offer.textbook_id;

    })

    return textbook;

  }

  getPendingOfferSellerOffer(offer_id:number) {
    let that = this;

    var offer:Offer = this.all_offers.find(function (offer:Offer) {
      return offer.id == offer_id;
    })


    return offer;

  }

  getPendingOfferBuyer(pending_offer_id) {
    let that = this;

    var user:User = this.all_users.find(function (user:User) {

      var buyer_pending_offer = that.buyer_pending_offers.find(function (pending_offer:PendingOffer) {
        return pending_offer.id == pending_offer_id;
      })

      return user.id == buyer_pending_offer.buyer_id;

    })

    return user;

  }

  getPendingOfferSeller(offer_id) {

    let that = this;

    var user:User = this.all_users.find(function (user:User) {

      var offer = that.all_offers.find(function (offer:Offer) {
        return offer.id == offer_id;
      })

      var textbook = that.all_textbooks.find(function (textbook:Textbook) {
        return textbook.id == offer.textbook_id;
      })

      return user.id == textbook.user_id;

    })

    return user;
  }

  // OPTIMIZE END


}
