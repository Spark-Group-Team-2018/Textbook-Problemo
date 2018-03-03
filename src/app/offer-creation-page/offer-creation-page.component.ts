import { Component, OnInit } from '@angular/core';

import {Offer} from '../../models/offer';

import { RouterModule, Routes, Router, ActivatedRoute }  from '@angular/router';

@Component({
  selector: 'app-offer-creation-page',
  templateUrl: './offer-creation-page.component.html',
  styleUrls: ['./offer-creation-page.component.css']
})
export class OfferCreationPageComponent implements OnInit {

  public new_offer:Offer = Offer.createEmptyOffer();

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

  }

  goBack() {
    this.router.navigate(['/'])
  }

  submitOffer() {
    alert(JSON.stringify(this.new_offer));
  }

}
