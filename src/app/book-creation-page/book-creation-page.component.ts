import { Component, OnInit } from '@angular/core';

import {Book} from '../../models/book';
import {Manufacturer} from '../../models/manufacturer'

import { RouterModule, Routes, Router, ActivatedRoute }  from '@angular/router';

//Import the API
import {TextbookTradeSystemApi} from '../../lib/TTS_Api';

// User Database
import {UserDatabase} from '../../lib/User_Database';

@Component({
  selector: 'app-book-creation-page',
  templateUrl: './book-creation-page.component.html',
  styleUrls: ['./book-creation-page.component.css'],
  providers: [TextbookTradeSystemApi, UserDatabase]
})
export class BookCreationPageComponent implements OnInit {

  public new_book:Book;
  public manufacturer_id:string

  public manufacturers:Manufacturer[] = [];

  public user_id:number = null;

  constructor(private route: ActivatedRoute,
  private router: Router,
  private api: TextbookTradeSystemApi,
  private user_db: UserDatabase) {
    this.new_book = Book.createEmptyBook();

    let that = this;

    this.api.getManufacturers().then (function (manufacturers: Manufacturer[]) {
      that.manufacturers = manufacturers;
      console.log(that.manufacturers)
    })

    that.getUserId().then (function (user_id:number) {
      that.user_id = user_id;
    }).catch(function (err) {
      console.log(err);
      that.goBack();
    })

  }

  ngOnInit() {




  }

  submitBook() {
    let that = this;

    this.api.createBook(this.new_book).then (function (book:Book) {
      alert(JSON.stringify(book));
      that.goBack();
    }).catch (function (err) {
      alert("Unable to create book");
    })
  }

  getUserId() {

    let that = this;

    var user_id_promise = that.user_db.getUserId();

    return user_id_promise;

  }

  goBack() {
    this.router.navigate(['/profile'], {queryParams: {user_id: this.user_id}})
  }

}
