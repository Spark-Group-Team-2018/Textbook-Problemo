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
  public user_id:number = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    let that = this;

    that.getUserId().then (function (user_id:number) {
      that.user_id = user_id;
    }).catch(function (err) {
      console.log(err);
      that.goBack();
    })


  }

  goBack() {
    this.router.navigate(['/profile'], {queryParams: {user_id: this.user_id}})
  }

  submitOffer() {
    alert(JSON.stringify(this.new_offer));
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
