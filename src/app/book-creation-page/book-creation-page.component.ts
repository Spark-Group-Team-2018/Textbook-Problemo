import { Component, OnInit } from '@angular/core';

import {Book} from '../../models/book';

import { RouterModule, Routes, Router, ActivatedRoute }  from '@angular/router';

@Component({
  selector: 'app-book-creation-page',
  templateUrl: './book-creation-page.component.html',
  styleUrls: ['./book-creation-page.component.css']
})
export class BookCreationPageComponent implements OnInit {

  public new_book:Book;
  public manufacturer_id:string

  constructor(private route: ActivatedRoute,
  private router: Router) {
    this.new_book = Book.createEmptyBook();
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
