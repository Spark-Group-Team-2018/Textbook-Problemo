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

  public mode_selected:boolean = false;
  public book_creation_mode:string = "";

  public ISBN_Number:number;

  public book_search_query:string;

  public manufacturer_id:string;

  public book_results:any[] = [];

  public user:User;

  constructor(private route: ActivatedRoute,
  private router: Router,
  private api: TextbookTradeSystemApi,
  private user_db: UserDatabase) {
    this.new_book = Book.createEmptyBook();

    let that = this;

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

  /** Chooses the book creation mode **/

  modeSelect(mode:string) {

    this.mode_selected = true;
    this.book_creation_mode = mode;

  }


  //Updates the book_results list and searchs by book_name
  searchBooks() {
    let that = this;

    that.api.getBooksInfoFromQuery(that.book_search_query).then (function (books:any[]) {
      that.book_results = books;
    }).catch (function (err) {
      console.log(err);
    })


  }

  //Creats a book from the selected book_result
  submitBookResult(book_result:any) {
    let that = this;

    that.api.parseBookInfo(book_result, that.user["authToken"]).then (function (new_book:Book) {
      return that.api.createBook(new_book, that.user["authToken"])

    }).then (function (book:Book) {

      if (book.id.toString() != "NaN") {
        alert("book added!");
        that.goBack();
      }else {
        alert("This book already is in the catalogue");
        that.ISBN_Number = undefined;
      }
    }).catch (function (err) {
      alert("Unable to create book");
    })

  }

  //Submits a ISBN book creation
  submitISBNBook() {
    let that = this;

    if (this.ISBN_Number.toString().length != 13) { /** Validates if the number is a valid ISBN-13 **/
      alert("Not valid ISBN number");
      this.ISBN_Number = undefined;


    }else { /** retrieves the book info **/


      this.api.getBookInfoFromIsbn(this.ISBN_Number).then (function (bookInfo:any) {
        return that.api.parseBookInfo(bookInfo, that.user["authToken"]);
      }).then (function (new_book:Book) {
        return that.api.createBook(new_book, that.user["authToken"])

      }).then (function (book:Book) {

        if (book.id.toString() != "NaN") {
          alert("book added!");
          that.goBack();
        }else {
          alert("This book already is in the catalogue");
          that.ISBN_Number = undefined;
        }
      }).catch (function (err) {
        alert("Unable to create book");
      })
    }
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
