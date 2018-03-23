import { Component, OnInit } from '@angular/core';

//models
import {Offer} from '../../models/offer';
import {Textbook} from '../../models/textbook';
import {PendingOffer} from '../../models/pendingoffer';

//TTS Api
import {TextbookTradeSystemApi} from '../../lib/TTS_Api';

//Routing System Lib
import { RouterModule, Routes, Router, ActivatedRoute }  from '@angular/router';

@Component({
  selector: 'app-browse-offers-page',
  templateUrl: './browse-offers-page.component.html',
  styleUrls: ['./browse-offers-page.component.css'],
  providers: [TextbookTradeSystemApi]
})
export class BrowseOffersPageComponent implements OnInit {

  public offers:Offer[] = [];

  public textbooks:Textbook[] = [];

  //FIXME
  public user_id:number = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: TextbookTradeSystemApi
  ) { }

  ngOnInit() {

    let that = this;

    this.getUserId().then (function (user_id:number) {
      that.user_id = user_id;
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

  getTextbook(id:number) {
    return this.textbooks.find(function (textbook:Textbook) {
      return textbook.id == id;
    })
  }


  //IMPLEMENTME
  sendOffer(offer_id:number) {
    var new_pending_offer:PendingOffer = PendingOffer.createPendingOffer(offer_id, this.user_id);

    let that = this;

    that.api.createPendingOffer(new_pending_offer).then (function (pendingOffer: PendingOffer) {
      alert(JSON.stringify(pendingOffer));
      that.goToProfile();
    }).catch (function (err) {
      alert("Unable to send pending offer");
      console.log(err);
    })

  }

  goToProfile() {

    this.router.navigate(['/profile'], {queryParams: {user_id: this.user_id}});

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
