import { Component, OnInit } from '@angular/core';

import {Offer} from '../../models/offer';
import {Textbook} from '../../models/textbook';

import { RouterModule, Routes, Router, ActivatedRoute }  from '@angular/router';

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
export class OfferCreationPageComponent implements OnInit {

  public new_offer:Offer = Offer.createEmptyOffer();
  public user_id:number = null;

  public user_textbooks:Textbook[] = [];
  public mode:string = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: TextbookTradeSystemApi,
    private user_db: UserDatabase
  ) { }

  ngOnInit() {

    let that = this;

    that.getUserId().then (function (user_id:number) {
      that.user_id = user_id;
      return that.api.getUserTextbooks(that.user_id);
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

  goBack() {
    this.router.navigate(['/profile'], {queryParams: {user_id: this.user_id}})
  }

  submitOffer() {

    let that = this;

    var offer_promise = null;

    switch(that.mode) {
      case 'create':
        offer_promise = this.api.createOffer(this.new_offer);
        break;
      case 'update':
        offer_promise = this.api.updateOffer(this.new_offer);
        break;
    }

    offer_promise.then (function (offer:Offer) {
      alert(JSON.stringify(offer));
      that.goBack();
    }).catch (function (err) {
      alert("Unable to create offer");
    })


  }

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

  getUserId() {

    let that = this;

    var user_id_promise = that.user_db.getUserId();

    return user_id_promise;

  }


}
