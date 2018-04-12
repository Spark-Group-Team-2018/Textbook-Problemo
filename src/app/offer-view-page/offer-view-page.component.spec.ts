import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferViewPageComponent } from './offer-view-page.component';

describe('OfferViewPageComponent', () => {
  let component: OfferViewPageComponent;
  let fixture: ComponentFixture<OfferViewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferViewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
