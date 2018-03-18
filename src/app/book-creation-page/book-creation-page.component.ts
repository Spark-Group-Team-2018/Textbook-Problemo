import { Component, OnInit } from '@angular/core';

import {Book} from '../../models/book';
import {Manufacturer} from '../../models/manufacturer'

import { RouterModule, Routes, Router, ActivatedRoute }  from '@angular/router';

//Import the API
import {TextbookTradeSystemApi} from '../../lib/TTS_Api';

@Component({
  selector: 'app-book-creation-page',
  templateUrl: './book-creation-page.component.html',
  styleUrls: ['./book-creation-page.component.css'],
  providers: [TextbookTradeSystemApi]
})
export class BookCreationPageComponent implements OnInit {

  public new_book:Book;
  public manufacturer_id:string

  public manufacturers:Manufacturer[] = [];

  constructor(private route: ActivatedRoute,
  private router: Router,
  private api: TextbookTradeSystemApi) {
    this.new_book = Book.createEmptyBook();

    let that = this;

    this.api.getManufacturers().then (function (manufacturers: Manufacturer[]) {
      that.manufacturers = manufacturers;
      console.log(that.manufacturers)
    })

  }

  ngOnInit() {
  }

  submitBook() {
    alert(JSON.stringify(this.new_book));
  }

  goBack() {
    this.router.navigate(['/'])
  }

}
