import { Component, OnInit } from '@angular/core';

import {Offer} from '../../models/offer';
import {Textbook} from '../../models/textbook';

import { RouterModule, Routes, Router, ActivatedRoute }  from '@angular/router';

import {TextbookTradeSystemApi} from '../../lib/TTS_Api';

@Component({
  selector: 'app-offer-creation-page',
  templateUrl: './offer-creation-page.component.html',
  styleUrls: ['./offer-creation-page.component.css'],
  providers: [TextbookTradeSystemApi]
})
export class OfferCreationPageComponent implements OnInit {

  public new_offer:Offer = Offer.createEmptyOffer();
  public user_id:number = null;

  public user_textbooks:Textbook[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: TextbookTradeSystemApi
  ) { }

  ngOnInit() {

    let that = this;

    that.getUserId().then (function (user_id:number) {
      that.user_id = user_id;
      return that.api.getUserTextbooks(that.user_id);
    }).then (function (textbooks: Textbook[]) {
      that.user_textbooks = textbooks;
      console.log(that.user_textbooks);
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

    this.api.createOffer(this.new_offer).then (function (offer:Offer) {
      alert(JSON.stringify(offer));
      that.goBack();
    }).catch (function (err) {
      alert("Unable to create offer");
    })

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


}
