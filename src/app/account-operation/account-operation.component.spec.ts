import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOperationComponent } from './account-operation.component';

describe('AccountOperationComponent', () => {
  let component: AccountOperationComponent;
  let fixture: ComponentFixture<AccountOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
