import { Component, OnInit } from '@angular/core';

//models
import {Offer} from '../../models/offer';
import {Textbook} from '../../models/textbook';
import {PendingOffer} from '../../models/pendingoffer';
import {User} from '../../models/user';

//TTS Api
import {TextbookTradeSystemApi} from '../../lib/TTS_Api';

//Routing System Lib
import { RouterModule, Routes, Router, ActivatedRoute }  from '@angular/router';

//User Database System
import {UserDatabase} from '../../lib/User_Database';

@Component({
  selector: 'app-browse-offers-page',
  templateUrl: './browse-offers-page.component.html',
  styleUrls: ['./browse-offers-page.component.css'],
  providers: [TextbookTradeSystemApi, UserDatabase]
})
/**
Business logic for browsing offers
**/
export class BrowseOffersPageComponent implements OnInit {

  public offers:Offer[] = [];

  public textbooks:Textbook[] = [];

  public user:User = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: TextbookTradeSystemApi,
    private user_db: UserDatabase
  ) { }

  /**
  Gets the logged in user
  Get all the currently posted offers that the user can view
  **/
  ngOnInit() {

    let that = this;

    this.getUser().then (function (user:User) {
      that.user = user;

      if (user == null) {
        that.goToProfile();
      }

    }).catch (function (err) {
      console.log(err);
    })

    that.api.getOffers().then (function (offers: Offer[]) {
      that.offers = offers;
      console.log(offers);
    }).catch (function (err) {
      console.log(err);
    })

    that.api.getTextbooks().then (function (textbooks: Textbook[]) {
      that.textbooks = textbooks;
      console.log(textbooks);
    }).catch (function (err) {
      console.log(err);
    })

  }

  /**
  Gets the textbook associated with a offer
  **/
  getTextbook(id:number) {
    return this.textbooks.find(function (textbook:Textbook) {
      return textbook.id == id;
    })
  }


  /**
  Sending a pending offer for both users to view one anothers contact info
  **/
  sendOffer(offer_id:number) {
    var new_pending_offer:PendingOffer = PendingOffer.createPendingOffer(offer_id, this.user.id);

    let that = this;

    that.api.createPendingOffer(new_pending_offer, that.user["authToken"]).then (function (pendingOffer: PendingOffer) {
      alert(JSON.stringify(pendingOffer));
      that.goToProfile();
    }).catch (function (err) {
      alert("Unable to send pending offer");
      console.log(err);
    })

  }

  /**
  Go back to user profile
  **/
  goToProfile() {

    this.router.navigate(['/profile']);

  }

  /**
  Gets the user's id
  **/
  getUserId() {

    let that = this;

    var user_id_promise = that.user_db.getUserId();

    return user_id_promise;

  }

  /** Get the logged in user **/
  getUser() {

    let that = this;

    var user_promise = that.user_db.getUser();

    return user_promise;

  }

}
