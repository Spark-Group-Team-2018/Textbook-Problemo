import { Component, OnInit } from '@angular/core';

// Models
import {Offer} from '../../models/offer';
import {Textbook} from '../../models/textbook';
import {User} from '../../models/user';

// Routing
import { RouterModule, Routes, Router, ActivatedRoute }  from '@angular/router';

//Import API
import {TextbookTradeSystemApi} from '../../lib/TTS_Api';

//User Database
import {UserDatabase} from '../../lib/User_Database';

//Import rxjs helpers for API
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-offer-creation-page',
  templateUrl: './offer-creation-page.component.html',
  styleUrls: ['./offer-creation-page.component.css'],
  providers: [TextbookTradeSystemApi, UserDatabase]
})

/**
Business Logic for creation of Offers
**/
export class OfferCreationPageComponent implements OnInit {

  /**
  Declare variables used for creation of new offer
  **/
  public new_offer:Offer = Offer.createEmptyOffer();

  public user_textbooks:Textbook[] = [];
  public mode:string = null;

  public user:User = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: TextbookTradeSystemApi,
    private user_db: UserDatabase
  ) { }

  /**
  Get the logged in user
  Retrieve all the user textbooks
  check if the user wants to edit or create an offer'
  **/
  ngOnInit() {

    let that = this;

    that.getUser().then (function (user:User) {
      that.user = user;

      if (user == null) {
        that.goBack();
      }

      return that.api.getUserTextbooks(that.user.id);
    }).then (function (textbooks: Textbook[]) {
      that.user_textbooks = textbooks;
      console.log(that.user_textbooks);

      return that.getMode();

    }).then (function (mode:string) {
      that.mode = mode;

      if (that.mode == "update") {

        that.getOfferId().then (function (offer_id:number) {
          return that.api.getOfferById(offer_id);
        }).then (function (offer:Offer) {
          that.new_offer = offer;
        })

      }

    }).catch(function (err) {
      console.log(err);
      that.goBack();
    })


  }

  // Go back to profile
  goBack() {
    this.router.navigate(['/profile'])
  }

  // Creates a new offer
  submitOffer() {

    let that = this;

    var offer_promise = null;

    switch(that.mode) {
      case 'create':
        offer_promise = this.api.createOffer(this.new_offer, that.user["authToken"]);
        break;
      case 'update':
        offer_promise = this.api.updateOffer(this.new_offer, that.user["authToken"]);
        break;
    }

    offer_promise.then (function (offer:Offer) {
      alert(JSON.stringify(offer));
      that.goBack();
    }).catch (function (err) {
      console.log(err);
      alert("Unable to create offer");
    })


  }

  //Gets an existing offer by id
  getOfferId() {

    let that = this;

    var id_promise = new Promise(function (resolve, reject) {

      that.route
        .queryParams
        .subscribe(params => {
          let id:number = params["id"] || null;
          resolve(id);
        })
    })

    return id_promise;

  }

  //Get the mode (editting or creating)
  getMode() {

    let that = this;

    var mode_promise = new Promise(function (resolve, reject) {

      that.route
      .queryParams
      .subscribe(params => {
        let mode = params["mode"] || "create";
        resolve(mode);
      })


    })

    return mode_promise;

  }

  //Get the user's id
  getUserId() {

    let that = this;

    var user_id_promise = that.user_db.getUserId();

    return user_id_promise;

  }

  //Get the logged in user from the local db
  getUser() {

    let that = this;

    var user_promise = that.user_db.getUser();

    return user_promise;


  }


}
