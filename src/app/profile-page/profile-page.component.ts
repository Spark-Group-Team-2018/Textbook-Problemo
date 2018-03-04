import { Component, OnInit } from '@angular/core';

//Import the API
import {TextbookTradeSystemApi} from "../../lib/TTS_Api";

//Import the models
import {Textbook} from '../../models/textbook';
import {Offer} from '../../models/offer';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  providers: [TextbookTradeSystemApi]
})
export class ProfilePageComponent implements OnInit {

  public user_offers:Offer[] = [];
  public user_textbooks:Textbook[] = [];

  constructor(
    private api: TextbookTradeSystemApi
  ) { }

  ngOnInit() {

    let that = this;

    //Retrieve the user created offers
    this.api.getUserOffers().then (function (offers:Offer[]) {
      that.user_offers = offers
      console.log(that.user_offers);
    }).catch (function (err) {
      console.log(err);
    });

    //Retrieve the user created textbooks
    this.api.getUserTextbooks().then (function (textbooks: Textbook[]) {
      that.user_textbooks = textbooks;
      console.log(that.user_textbooks);
    }).catch (function (err) {
      console.log(err);
    })

  }

  getOfferTextbook(offer:Offer) {
    
    return this.user_textbooks.find(function (textbook:Textbook) {
      return offer.textbook_id == textbook.id
    })
  }

  getTest() {

  }

}
