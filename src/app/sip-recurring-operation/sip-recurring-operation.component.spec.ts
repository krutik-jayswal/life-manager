import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SipRecurringOperationComponent } from './sip-recurring-operation.component';

describe('SipRecurringOperationComponent', () => {
  let component: SipRecurringOperationComponent;
  let fixture: ComponentFixture<SipRecurringOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SipRecurringOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SipRecurringOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
