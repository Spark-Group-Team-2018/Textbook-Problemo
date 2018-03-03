import { Component, OnInit } from '@angular/core';

import {Textbook} from '../../models/textbook';

import { RouterModule, Routes, Router, ActivatedRoute }  from '@angular/router';

@Component({
  selector: 'app-textbook-creation-page',
  templateUrl: './textbook-creation-page.component.html',
  styleUrls: ['./textbook-creation-page.component.css']
})
export class TextbookCreationPageComponent implements OnInit {

  new_textbook:Textbook = Textbook.createEmptyTextbook()

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

  }

  submitTextbook() {
    alert(JSON.stringify(this.new_textbook));
  }

  goBack() {
    this.router.navigate(['/'])
  }

}
