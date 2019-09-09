import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferAccountBalanceComponent } from './transfer-account-balance.component';

describe('TransferAccountBalanceComponent', () => {
  let component: TransferAccountBalanceComponent;
  let fixture: ComponentFixture<TransferAccountBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferAccountBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferAccountBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
