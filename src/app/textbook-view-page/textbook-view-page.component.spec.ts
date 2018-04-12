import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextbookViewPageComponent } from './textbook-view-page.component';

describe('TextbookViewPageComponent', () => {
  let component: TextbookViewPageComponent;
  let fixture: ComponentFixture<TextbookViewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextbookViewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextbookViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
