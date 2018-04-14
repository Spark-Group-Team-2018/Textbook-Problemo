import { Component, OnInit } from '@angular/core';

/** Import models **/
import {Textbook} from '../../models/textbook';
import {Manufacturer} from '../../models/manufacturer';
import {User} from '../../models/user';
import {Book} from '../../models/book';
import {PendingOffer} from '../../models/pendingoffer';
//

/** API **/
import {
  TextbookTradeSystemApi
} from '../../lib/TTS_Api';

/** Routing **/
import {Router, ActivatedRoute, ParamMap, NavigationExtras} from '@angular/router';
import { Observable }         from 'rxjs/Observable';

@Component({
  selector: 'app-pending-offer-view-page',
  templateUrl: './pending-offer-view-page.component.html',
  styleUrls: ['./pending-offer-view-page.component.css'],
  providers: [TextbookTradeSystemApi]
})
export class PendingOfferViewPageComponent implements OnInit {

  public current_pendingoffer:PendingOffer = null;
  public seller:User = null;
  public buyer:User = null;
  public offer:Offer = null;
  public textbook:Textbook = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: TextbookTradeSystemApi
  ) { }

  ngOnInit() {

    let that = this;

    this.getID().then (function (id:number) {
      return that.api.getPendingOfferById(id);
    }).then (function (pendingoffer: PendingOffer) {
      that.current_pendingoffer = pendingoffer;

      return that.api.getUserById(that.current_pendingoffer.buyer_id);

    }).then (function (buyer:User) {
      that.buyer = buyer;
      return that.api.getOfferById(that.current_pendingoffer.offer_id);
    }).then (function (offer:Offer) {
      that.offer = offer;
      return that.api.getTextbookById(that.offer.textbook_id);
    }).then (function (textbook:Textbook) {
      that.textbook = textbook;
      return that.api.getUserById(that.textbook.user_id);
    }).then (function (seller:User) {
      that.seller = seller;
    })

  }

  goBack() {
    history.back();
  }

  getID() {

    let that = this;
    var id_promise = new Promise (function (resolve, reject) {
      this.sub = that.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        var id:number = +params['id'] || null;
        resolve(id);
      });
    })

    return id_promise;
  }

}
