import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConfigPageComponent } from './user-config-page.component';

describe('UserConfigPageComponent', () => {
  let component: UserConfigPageComponent;
  let fixture: ComponentFixture<UserConfigPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserConfigPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserConfigPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
