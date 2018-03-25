import { Component, OnInit } from '@angular/core';

import {Textbook} from '../../models/textbook';
import {Book} from '../../models/book';

import { RouterModule, Routes, Router, ActivatedRoute, NavigationExtras }  from '@angular/router';

//Import the api
import {TextbookTradeSystemApi} from '../../lib/TTS_Api';

//User Database
import {UserDatabase} from '../../lib/User_Database';

//Import rxjs helpers for API
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-textbook-creation-page',
  templateUrl: './textbook-creation-page.component.html',
  styleUrls: ['./textbook-creation-page.component.css'],
  providers: [TextbookTradeSystemApi, UserDatabase]
})
export class TextbookCreationPageComponent implements OnInit {

  public new_textbook:Textbook = Textbook.createEmptyTextbook();
  public user_id:number = null;

  public books:Book[] = [];
  public mode:string = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: TextbookTradeSystemApi,
    private user_db: UserDatabase
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
      return that.getMode();
    }).then (function (mode:string) {
      that.mode = mode;

      if (that.mode == "update") {

        that.getTextbookId().then (function (textbook_id:number) {
          return that.api.getTextbookById(textbook_id);
        }).then (function (textbook:Textbook) {
          that.new_textbook = textbook;
        })

      }

    }).catch(function (err) {
      console.log(err);
      that.goBack();
    })

  }

  ngOnInit() {

  }

  submitTextbook() {

    let that = this;

    var textbook_promise = null;

    switch (that.mode) {
      case 'create':

        /** Create the Textbook on the Backend **/

        textbook_promise = this.api.createTextbook(this.new_textbook)

        break;

      case 'update':

        textbook_promise = this.api.updateTextbook(this.new_textbook);

        break;
    }

    textbook_promise.then (function (textbook:Textbook) {
      alert(JSON.stringify(textbook));
      that.goBack();
    }).catch (function (err) {
      alert("Unable to create/update textbook");
      console.log(err);
    })


  }

  goBack() {

    this.router.navigate(['/profile'], {queryParams: {user_id: this.user_id}})
  }

  getTextbookId() {

    let that = this;

    var id_promise = new Promise(function (resolve, reject) {

      that.route
        .queryParams
        .subscribe(params => {
          let id:number = params["id"] || null;
          resolve(id);
        })
    })

    return id_promise;

  }

  getMode() {

    let that = this;

    var mode_promise = new Promise(function (resolve, reject) {

      that.route
      .queryParams
      .subscribe(params => {
        let mode = params["mode"] || "create";
        resolve(mode);
      })


    })

    return mode_promise;

  }

  getUserId() {

    let that = this;

    var user_id_promise = that.user_db.getUserId();

    return user_id_promise;

  }

}
