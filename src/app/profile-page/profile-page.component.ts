import { Component, OnInit } from '@angular/core';

//Import the API
import {TextbookTradeSystemApi} from "../../lib/TTS_Api";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  providers: [TextbookTradeSystemApi]
})
export class ProfilePageComponent implements OnInit {

  constructor(
    private api: TextbookTradeSystemApi
  ) { }

  ngOnInit() {
  }

  getTest() {

    this.api.getUserOffers();

  }

}
