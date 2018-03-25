import { Component, OnInit } from '@angular/core';

import {Textbook} from '../../models/textbook';
import {Book} from '../../models/book';

import { RouterModule, Routes, Router, ActivatedRoute, NavigationExtras }  from '@angular/router';

//Import the api
import {TextbookTradeSystemApi} from '../../lib/TTS_Api';

//User Database
import {UserDatabase} from '../../lib/User_Database';

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

    var user_id_promise = that.user_db.getUserId();

    return user_id_promise;

  }

}
