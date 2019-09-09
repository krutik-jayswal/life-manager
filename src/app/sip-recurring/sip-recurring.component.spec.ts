import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SipRecurringComponent } from './sip-recurring.component';

describe('SipRecurringComponent', () => {
  let component: SipRecurringComponent;
  let fixture: ComponentFixture<SipRecurringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SipRecurringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SipRecurringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
