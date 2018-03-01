import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextbookCreationPageComponent } from './textbook-creation-page.component';

describe('TextbookCreationPageComponent', () => {
  let component: TextbookCreationPageComponent;
  let fixture: ComponentFixture<TextbookCreationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextbookCreationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextbookCreationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
