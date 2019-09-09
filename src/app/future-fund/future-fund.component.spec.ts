import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureFundComponent } from './future-fund.component';

describe('FutureFundComponent', () => {
  let component: FutureFundComponent;
  let fixture: ComponentFixture<FutureFundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutureFundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
