import { Component, OnInit } from '@angular/core';

//Retrive the book model
import {Book} from '../../models/book';

//Router
import { RouterModule, Routes, Router, ActivatedRoute }  from '@angular/router';

//API
import {TextbookTradeSystemApi} from "../../lib/TTS_Api";

@Component({
  selector: 'app-browse-books-page',
  templateUrl: './browse-books-page.component.html',
  styleUrls: ['./browse-books-page.component.css'],
  providers: [TextbookTradeSystemApi]
})
export class BrowseBooksPageComponent implements OnInit {

  public books:Book[] = [];

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

  viewBook(id:number) {
    this.router.navigate(['view-book', id]);
  }

  ngOnInit() {
  }

}
