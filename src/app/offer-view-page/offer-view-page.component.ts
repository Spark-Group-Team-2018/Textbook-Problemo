import { Component, OnInit } from '@angular/core';

/** Import the models **/
import {Textbook} from '../../models/textbook';
import {Manufacturer} from '../../models/manufacturer';
import {User} from '../../models/user';
import {Book} from '../../models/book';
import {Offer} from '../../models/offer';

/** API **/
import {
  TextbookTradeSystemApi
} from '../../lib/TTS_Api';

/** Routing **/
import {Router, ActivatedRoute, ParamMap, NavigationExtras} from '@angular/router';
import { Observable }         from 'rxjs/Observable';

//Import rxjs helpers for API
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-offer-view-page',
  templateUrl: './offer-view-page.component.html',
  styleUrls: ['./offer-view-page.component.css'],
  providers: [TextbookTradeSystemApi]
})
export class OfferViewPageComponent implements OnInit {


  public offer:Offer = null;
  public textbook:Textbook = null;
  public user:User = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: TextbookTradeSystemApi
  ) { }

  ngOnInit() {
    let that = this;

    this.getID().then (function (id:number) {
      return that.api.getOfferById(id);
    }).then (function (offer:Offer) {
      that.offer = offer;
      return that.api.getTextbookById(that.offer.textbook_id);
    }).then (function (textbook:Textbook) {
      that.textbook = textbook;
      return that.api.getUserById(that.textbook.user_id);
    }).then (function (user:User) {
      that.user = user;
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
