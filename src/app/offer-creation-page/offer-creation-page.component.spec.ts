import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferCreationPageComponent } from './offer-creation-page.component';

describe('OfferCreationPageComponent', () => {
  let component: OfferCreationPageComponent;
  let fixture: ComponentFixture<OfferCreationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferCreationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferCreationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
