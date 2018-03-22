import { Component, OnInit } from '@angular/core';

import {Textbook} from '../../models/textbook';
import {Book} from '../../models/book';

import { RouterModule, Routes, Router, ActivatedRoute, NavigationExtras }  from '@angular/router';

//Import the api
import {TextbookTradeSystemApi} from '../../lib/TTS_Api';

@Component({
  selector: 'app-textbook-creation-page',
  templateUrl: './textbook-creation-page.component.html',
  styleUrls: ['./textbook-creation-page.component.css'],
  providers: [TextbookTradeSystemApi]
})
export class TextbookCreationPageComponent implements OnInit {

  public new_textbook:Textbook = Textbook.createEmptyTextbook();
  public user_id:number = null;

  public books:Book[] = [];



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: TextbookTradeSystemApi
  ) {

    let that = this;

    this.api.getBooks().then (function (books:Book[]){
      that.books = books;
    }).catch (function (err) {
      console.log(err);
    })

    that.getUserId().then (function (user_id:number) {
      that.user_id = user_id;
      that.new_textbook.user_id = user_id;
    }).catch(function (err) {
      console.log(err);
      that.goBack();
    })

  }

  ngOnInit() {

  }

  submitTextbook() {

    let that = this;

    this.api.createTextbook(this.new_textbook).then (function (textbook:Textbook) {
      alert(JSON.stringify(textbook));
      that.goBack();
    }).catch (function (err) {
      alert("Unable to create textbook");
    })


  }

  goBack() {

    this.router.navigate(['/profile'], {queryParams: {user_id: this.user_id}})
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
