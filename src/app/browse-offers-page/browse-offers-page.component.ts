import { Component, OnInit } from '@angular/core';

//models
import {Offer} from '../../models/offer';

//TTS Api
import {TextbookTradeSystemApi} from '../../lib/TTS_Api';

@Component({
  selector: 'app-browse-offers-page',
  templateUrl: './browse-offers-page.component.html',
  styleUrls: ['./browse-offers-page.component.css'],
  providers: [TextbookTradeSystemApi]
})
export class BrowseOffersPageComponent implements OnInit {

  public offers:Offer[] = [];

  public textbooks:Textbook[] = [];

  constructor(
    private api: TextbookTradeSystemApi
  ) { }

  ngOnInit() {

    let that = this;

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

}
