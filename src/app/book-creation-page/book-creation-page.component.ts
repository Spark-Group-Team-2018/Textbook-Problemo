import { Component, OnInit } from '@angular/core';

import {Book} from '../../models/book';
import {Manufacturer} from '../../models/manufacturer';
import {User} from '../../models/user';

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
  public manufacturer_id:string;

  public manufacturers:Manufacturer[] = [];

  public user:User;

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

    that.getUser().then (function (user:User) {
      that.user = user;

      if (that.user == null) {
        that.goBack();
      }

    }).catch (function (err) {
      console.log(err);
      that.goBack();
    })


  }

  ngOnInit() {




  }

  submitBook() {
    let that = this;

    this.api.createBook(this.new_book, that.user["authToken"]).then (function (book:Book) {
      alert(JSON.stringify(book));
      that.goBack();
    }).catch (function (err) {
      alert("Unable to create book");
    })
  }

  getUser() {

    let that = this;

    var user_promise = that.user_db.getUser();

    return user_promise;

  }

  goBack() {
    this.router.navigate(['/profile'])
  }

}
