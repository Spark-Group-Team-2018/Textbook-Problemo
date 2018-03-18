import { Component, OnInit } from '@angular/core';

import {Textbook} from '../../models/textbook';
import {Book} from '../../models/book';

import { RouterModule, Routes, Router, ActivatedRoute }  from '@angular/router';

//Import the api
import {TextbookTradeSystemApi} from '../../lib/TTS_Api';

@Component({
  selector: 'app-textbook-creation-page',
  templateUrl: './textbook-creation-page.component.html',
  styleUrls: ['./textbook-creation-page.component.css'],
  providers: [TextbookTradeSystemApi]
})
export class TextbookCreationPageComponent implements OnInit {

  new_textbook:Textbook = Textbook.createEmptyTextbook()

  books:Book[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: TextbookTradeSystemApi
  ) {

    let that = this;

    this.api.getBooks().then (function (books:Book[]){
      that.books = books;
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
    this.router.navigate(['/'])
  }

}
