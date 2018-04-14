import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseOffersPageComponent } from './browse-offers-page.component';

describe('BrowseOffersPageComponent', () => {
  let component: BrowseOffersPageComponent;
  let fixture: ComponentFixture<BrowseOffersPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseOffersPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseOffersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
