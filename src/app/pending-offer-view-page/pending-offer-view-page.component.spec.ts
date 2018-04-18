import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingOfferViewPageComponent } from './pending-offer-view-page.component';

describe('PendingOfferViewPageComponent', () => {
  let component: PendingOfferViewPageComponent;
  let fixture: ComponentFixture<PendingOfferViewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingOfferViewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingOfferViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
