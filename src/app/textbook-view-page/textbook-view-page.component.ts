import { Component, OnInit } from '@angular/core';

/** Import models **/
import {Textbook} from '../../models/textbook';
import {Manufacturer} from '../../models/manufacturer';
import {User} from '../../models/user';
import {Book} from '../../models/book';
//

/** API **/
import {
  TextbookTradeSystemApi
} from '../../lib/TTS_Api';

/** Routing **/
import {Router, ActivatedRoute, ParamMap, NavigationExtras} from '@angular/router';
import { Observable }         from 'rxjs/Observable';

//Import rxjs helpers for API
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-textbook-view-page',
  templateUrl: './textbook-view-page.component.html',
  styleUrls: ['./textbook-view-page.component.css'],
  providers: [TextbookTradeSystemApi]
})
export class TextbookViewPageComponent implements OnInit {

  public textbook_id:number
  public textbook:Textbook = null;
  public book:Book = null;
  public manufacturer:Manufacturer = null;
  public user:User = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: TextbookTradeSystemApi
  ) { }

  ngOnInit() {
    let that = this;

    this.getID().then (function (id:number) {
      that.textbook_id = id;
      console.log(that.textbook_id);
      return that.api.getTextbookById(that.textbook_id);
    }).then (function (textbook: Textbook) {
      that.textbook = textbook;
      return that.api.getBookById(textbook.book_id);
    }).then (function (book:Book) {
      return that.api.getManufacturerById(book.manufacturer_id);
    }).then (function (manufacturer:Manufacturer) {
      that.manufacturer = manufacturer;
      return that.api.getUserById(that.textbook.user_id);
    }).then (function (user:User) {
      that.user = user;
    })
  }

  goBack() {
    history.back();
  }

  getID() {

    let that = this;
    var id_promise = new Promise (function (resolve, reject) {
      this.sub = that.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        var id:number = +params['id'] || null;
        resolve(id);
      });
    })

    return id_promise;
  }

}
