import { Component, OnInit } from '@angular/core';

//Import models
import {Book} from '../../models/book';
import {Manufacturer} from '../../models/manufacturer';

//Import api
import {TextbookTradeSystemApi} from '../../lib/TTS_Api';

//Import rxjs helpers for API
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

//Import routing
import { RouterModule, Routes, Router, ActivatedRoute, NavigationExtras }  from '@angular/router';

@Component({
  selector: 'app-view-book-page',
  templateUrl: './view-book-page.component.html',
  styleUrls: ['./view-book-page.component.css'],
  providers: [TextbookTradeSystemApi]
})

/**
Page designated for viewing book business logic
**/

export class ViewBookPageComponent implements OnInit {

  /** Book variables **/
  public book:Book = null;
  public manufacturer:Manufacturer = null;

  constructor(
    private api: TextbookTradeSystemApi,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  /**
  Get the specified book to view
  Get the associated manufacturer
  **/

  ngOnInit() {

    let that = this;

    this.getBookId().then (function (book_id:number) {
      return that.api.getBookById(book_id);
    }).then (function (book:Book) {
      that.book = book;
      return that.api.getManufacturerById(that.book.manufacturer_id);
    }).then (function (manufacturer:Manufacturer) {
      that.manufacturer = manufacturer;
    }).catch (function (err) {
      console.log(err);
    })

  }

  /**
  Navigate back to the browse books page
  **/
  browseBooks() {
    this.router.navigate(['/browse-books'])
  }

  /**
  Get the book id
  **/
  getBookId() {

    let that = this;

    var book_id_promise = new Promise(function (resolve, reject) {
      that.route
      .params
      .subscribe(params => {
        let id:number = params["id"] || null;
        resolve(id);
      })
    })

    return book_id_promise;

  }

}
