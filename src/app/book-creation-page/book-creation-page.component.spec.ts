import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCreationPageComponent } from './book-creation-page.component';

describe('BookCreationPageComponent', () => {
  let component: BookCreationPageComponent;
  let fixture: ComponentFixture<BookCreationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookCreationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCreationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
